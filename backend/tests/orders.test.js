// Integration tests for the order flow (auth, validation, pricing, admin actions).
// Runs against the Supabase project in backend/.env. Orders created here use
// "test_" user ids and are deleted when the run finishes.
import "dotenv/config"; // must load before any app module reads process.env
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { DELIVERY_FEE, FREE_SHIPPING_THRESHOLD } from "../controllers/orderController.js";

const PORT = 4100;
const BASE = `http://localhost:${PORT}`;

process.env.PORT = String(PORT);
process.env.JWT_SECRET = "test-secret";
process.env.ADMIN_EMAIL = "admin@test.com";
process.env.ADMIN_PASSWORD = "test-password";
process.env.CLERK_PUBLISHABLE_KEY = `pk_test_${Buffer.from("test.clerk.accounts.dev$").toString("base64")}`;

// INFO: Serve a locally generated key as Clerk's JWKS so we can mint session tokens
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "test-kid", alg: "RS256", use: "sig" };
const realFetch = globalThis.fetch;
globalThis.fetch = (url, options) =>
  String(url).endsWith("/.well-known/jwks.json")
    ? Promise.resolve(new Response(JSON.stringify({ keys: [jwk] })))
    : realFetch(url, options);

const sessionToken = (userId, options = {}) =>
  jwt.sign({ sub: userId }, privateKey, {
    algorithm: "RS256",
    keyid: "test-kid",
    expiresIn: "5m",
    ...options,
  });

const api = async (path, { body, bearer, adminToken } = {}) => {
  const response = await realFetch(BASE + path, {
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      ...(bearer && { Authorization: `Bearer ${bearer}` }),
      ...(adminToken && { token: adminToken }),
    },
    body: body && JSON.stringify(body),
  });
  return { status: response.status, data: await response.json() };
};

const address = {
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  street: "1 MG Road",
  city: "Bengaluru",
  state: "Karnataka",
  zipcode: "560001",
  country: "India",
  phone: "9876543210",
};

let supabase;
let product;
const alice = sessionToken("test_alice");
const bob = sessionToken("test_bob");
const carol = sessionToken("test_carol");
const dave = sessionToken("test_dave");

const deleteTestOrders = () => supabase.from("orders").delete().like("user_id", "test_%");

before(async () => {
  supabase = (await import("../config/supabase.js")).default;
  await import("../server.js");
  // INFO: Wait for the server to connect, seed and start listening
  for (let i = 0; i < 50; i++) {
    try {
      const { status } = await api("/api/health");
      if (status === 200) break;
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  const { data } = await api("/api/product/list");
  product = data.products[0];
  await deleteTestOrders();
});

after(async () => {
  await deleteTestOrders();
});

const validItem = () => ({ productId: product._id, size: product.sizes[0], quantity: 2 });

test("rejects orders without a session token", async () => {
  const { status } = await api("/api/order/place", { body: { items: [validItem()], address } });
  assert.equal(status, 401);
});

test("rejects expired and forged tokens", async () => {
  const expired = sessionToken("test_alice", { expiresIn: -10 });
  const otherKey = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 }).privateKey;
  const forged = jwt.sign({ sub: "test_alice" }, otherKey, { algorithm: "RS256", keyid: "test-kid" });

  for (const bearer of [expired, forged]) {
    const { status } = await api("/api/order/place", { bearer, body: { items: [validItem()], address } });
    assert.equal(status, 401);
  }
});

test("validates cart items and address", async () => {
  const cases = [
    { items: [], address },
    { items: [{ ...validItem(), size: "XXXL" }], address },
    { items: [{ ...validItem(), quantity: 0 }], address },
    { items: [{ ...validItem(), productId: "not-an-id" }], address },
    { items: [validItem()], address: { ...address, email: "invalid" } },
    { items: [validItem()], address: { ...address, city: " " } },
  ];
  for (const body of cases) {
    const { status } = await api("/api/order/place", { bearer: alice, body });
    assert.equal(status, 400, JSON.stringify(body));
  }
});

test("places an order using database prices, not client prices", async () => {
  const { status } = await api("/api/order/place", {
    bearer: alice,
    body: { items: [{ ...validItem(), price: 1 }], address },
  });
  assert.equal(status, 201);

  const { data } = await api("/api/order/user", { bearer: alice });
  assert.equal(data.orders.length, 1);
  assert.equal(data.orders[0].subtotal, product.price * 2);
  assert.equal(data.orders[0].amount, product.price * 2 + data.orders[0].deliveryFee);
});

test("applies free shipping only above the threshold", async () => {
  const { data: list } = await api("/api/product/list");
  const cheapest = [...list.products].sort((a, b) => a.price - b.price)[0];
  const bigOrderQty = Math.ceil(FREE_SHIPPING_THRESHOLD / cheapest.price);

  for (const [quantity, expectedFee] of [[1, DELIVERY_FEE], [bigOrderQty, 0]]) {
    const { status } = await api("/api/order/place", {
      bearer: carol,
      body: { items: [{ productId: cheapest._id, size: cheapest.sizes[0], quantity }], address },
    });
    assert.equal(status, 201);
    const { data } = await api("/api/order/user", { bearer: carol });
    assert.equal(data.orders[0].deliveryFee, expectedFee, `quantity ${quantity}`);
  }
});

test("users only see their own orders", async () => {
  const { data } = await api("/api/order/user", { bearer: bob });
  assert.equal(data.orders.length, 0);
});

test("only admins can list orders and update status", async () => {
  assert.equal((await api("/api/order/list", { adminToken: alice })).status, 401);

  const { data: login } = await api("/api/user/admin", {
    body: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
  });
  const { data } = await api("/api/order/list", { adminToken: login.token });
  const orderId = data.orders.find((order) => order.userId === "test_alice")._id;

  const invalid = await api("/api/order/status", {
    adminToken: login.token,
    body: { orderId, status: "Teleported" },
  });
  assert.equal(invalid.status, 400);

  const delivered = await api("/api/order/status", {
    adminToken: login.token,
    body: { orderId, status: "Delivered" },
  });
  assert.equal(delivered.data.order.status, "Delivered");
  assert.equal(delivered.data.order.payment, true, "COD is marked paid on delivery");

  const { data: mine } = await api("/api/order/user", { bearer: alice });
  assert.equal(mine.orders[0].status, "Delivered");
});

test("card/UPI orders are hidden until Razorpay payment is verified", async () => {
  const placed = await api("/api/order/place", {
    bearer: dave,
    body: { items: [validItem()], address, paymentMethod: "Razorpay" },
  });
  assert.equal(placed.status, 201);
  const { razorpay } = placed.data;
  assert.match(razorpay.id, /^order_/);
  assert.equal(razorpay.currency, "INR");

  // Unpaid: not visible yet
  let mine = await api("/api/order/user", { bearer: dave });
  assert.equal(mine.data.orders.length, 0);
  assert.equal(razorpay.amount, Math.round((product.price * 2 + (product.price * 2 >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE)) * 100));

  const paymentId = "pay_test123";
  const forged = await api("/api/order/verify", {
    bearer: dave,
    body: { razorpay_order_id: razorpay.id, razorpay_payment_id: paymentId, razorpay_signature: "0".repeat(64) },
  });
  assert.equal(forged.status, 400);

  const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay.id}|${paymentId}`)
    .digest("hex");
  const body = { razorpay_order_id: razorpay.id, razorpay_payment_id: paymentId, razorpay_signature: signature };

  // Someone else cannot claim this payment
  assert.equal((await api("/api/order/verify", { bearer: bob, body })).status, 404);

  const verified = await api("/api/order/verify", { bearer: dave, body });
  assert.equal(verified.status, 200);

  mine = await api("/api/order/user", { bearer: dave });
  assert.equal(mine.data.orders.length, 1);
  assert.equal(mine.data.orders[0].paymentMethod, "Razorpay");
  assert.equal(mine.data.orders[0].payment, true);
});

test("admin token does not contain the admin password", async () => {
  const { data } = await api("/api/user/admin", {
    body: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
  });
  const payload = JSON.stringify(jwt.decode(data.token));
  assert.ok(!payload.includes(process.env.ADMIN_PASSWORD));
});
