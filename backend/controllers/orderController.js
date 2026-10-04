import validator from "validator";
import supabase from "../config/supabase.js";
import { ORDER_STATUSES, toOrder, toProduct } from "../models/mappers.js";
import {
  createRazorpayOrder,
  isRazorpayConfigured,
  isValidPaymentSignature,
} from "../config/razorpay.js";

export const DELIVERY_FEE = 99;
export const FREE_SHIPPING_THRESHOLD = 1999;

const ADDRESS_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "street",
  "city",
  "state",
  "zipcode",
  "country",
  "phone",
];

// A validation problem we can show to the shopper (400), not a server error
class OrderError extends Error {}

// INFO: Validates the cart and address and prices everything from the database.
// Prices are always taken from the database, never from the client.
const buildOrder = async ({ items, address }) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new OrderError("Your cart is empty");
  }

  const cleanAddress = {};
  for (const field of ADDRESS_FIELDS) {
    const value = String(address?.[field] ?? "").trim();
    if (!value) throw new OrderError(`Please provide a valid ${field}`);
    cleanAddress[field] = value;
  }
  if (!validator.isEmail(cleanAddress.email)) throw new OrderError("Invalid email address");
  if (!/^\+?[0-9\s-]{7,15}$/.test(cleanAddress.phone)) throw new OrderError("Invalid phone number");

  const productIds = items.map((item) => item.productId);
  if (!productIds.every((id) => validator.isUUID(String(id ?? "")))) {
    throw new OrderError("Invalid product in cart");
  }

  const { data: rows, error } = await supabase
    .from("products")
    .select("*")
    .in("id", [...new Set(productIds)]);
  if (error) throw error;
  const productMap = new Map(rows.map((row) => [row.id, toProduct(row)]));

  const orderItems = items.map(({ productId, size, quantity }) => {
    const product = productMap.get(productId);
    const qty = Number(quantity);
    if (!product) throw new OrderError("A product in your cart is no longer available");
    if (!product.sizes.includes(size)) throw new OrderError(`Size ${size} unavailable for ${product.name}`);
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) throw new OrderError("Invalid quantity");
    return { productId: product._id, name: product.name, price: product.price, image: product.image[0], size, quantity: qty };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // INFO: Free shipping on larger orders (mirrored in the storefront cart)
  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE;

  return { orderItems, cleanAddress, subtotal, deliveryFee, amount: subtotal + deliveryFee };
};

// INFO: Route for placing an order.
// COD orders are confirmed immediately. Razorpay orders are saved unpaid and
// only become real orders once /verify confirms the payment signature.
const placeOrder = async (req, res) => {
  try {
    const paymentMethod = req.body.paymentMethod === "Razorpay" ? "Razorpay" : "COD";
    if (paymentMethod === "Razorpay" && !isRazorpayConfigured) {
      return res.status(400).json({ success: false, message: "Online payments are not available right now" });
    }

    const { orderItems, cleanAddress, subtotal, deliveryFee, amount } = await buildOrder(req.body);

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: req.userId,
        items: orderItems,
        subtotal,
        delivery_fee: deliveryFee,
        amount,
        address: cleanAddress,
        payment_method: paymentMethod,
      })
      .select("id")
      .single();
    if (error) throw error;

    if (paymentMethod === "COD") {
      return res.status(201).json({ success: true, message: "Order placed", orderId: order.id });
    }

    // INFO: Create the matching Razorpay order for the exact server-side amount
    const razorpayOrder = await createRazorpayOrder({ amount, receipt: order.id });
    const { error: linkError } = await supabase
      .from("orders")
      .update({ razorpay_order_id: razorpayOrder.id })
      .eq("id", order.id);
    if (linkError) throw linkError;

    res.status(201).json({ success: true, orderId: order.id, razorpay: razorpayOrder });
  } catch (error) {
    if (error instanceof OrderError) {
      return res.status(400).json({ success: false, message: error.message });
    }
    console.log("Error while placing order: ", error);
    res.status(500).json({ success: false, message: "Could not place order" });
  }
};

// INFO: Route called after the Razorpay popup succeeds. Marks the order paid
// only if the signature proves the payment came from Razorpay.
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;

    if (!isValidPaymentSignature({ orderId, paymentId, signature })) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .update({ payment: true, razorpay_payment_id: paymentId, updated_at: new Date().toISOString() })
      .eq("razorpay_order_id", orderId)
      .eq("user_id", req.userId)
      .select("id")
      .maybeSingle();
    if (error) throw error;
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: "Payment successful", orderId: order.id });
  } catch (error) {
    console.log("Error while verifying payment: ", error);
    res.status(500).json({ success: false, message: "Could not verify payment" });
  }
};

// Unpaid Razorpay orders (popup closed / payment failed) are not real orders yet
const isConfirmed = (row) => row.payment_method === "COD" || row.payment;

// INFO: Route for fetching the logged-in user's orders
const userOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });
    if (error) throw error;

    res.status(200).json({ success: true, orders: data.filter(isConfirmed).map(toOrder) });
  } catch (error) {
    console.log("Error while fetching user orders: ", error);
    res.status(500).json({ success: false, message: "Could not fetch orders" });
  }
};

// INFO: Route for fetching all orders (admin)
const allOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;

    res.status(200).json({ success: true, orders: data.filter(isConfirmed).map(toOrder) });
  } catch (error) {
    console.log("Error while fetching all orders: ", error);
    res.status(500).json({ success: false, message: "Could not fetch orders" });
  }
};

// INFO: Route for updating an order's status (admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!validator.isUUID(String(orderId ?? ""))) {
      return res.status(400).json({ success: false, message: "Invalid order id" });
    }
    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const update = { status, updated_at: new Date().toISOString() };
    // INFO: Cash on Delivery is collected when the order is delivered
    if (status === "Delivered") update.payment = true;

    const { data: order, error } = await supabase
      .from("orders")
      .update(update)
      .eq("id", orderId)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Status updated", order: toOrder(order) });
  } catch (error) {
    console.log("Error while updating order status: ", error);
    res.status(500).json({ success: false, message: "Could not update status" });
  }
};

export { placeOrder, verifyPayment, userOrders, allOrders, updateStatus };
