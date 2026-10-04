import crypto from "crypto";
import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID?.trim();
const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

export const isRazorpayConfigured = Boolean(keyId && keySecret);

const razorpay = isRazorpayConfigured
  ? new Razorpay({ key_id: keyId, key_secret: keySecret })
  : null;

// INFO: Create a Razorpay order. Amounts are in paise (₹1 = 100 paise).
export const createRazorpayOrder = async ({ amount, receipt }) => {
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt,
  });
  return { id: order.id, amount: order.amount, currency: order.currency, keyId };
};

// INFO: Razorpay signs "<order_id>|<payment_id>" with our secret (HMAC-SHA256).
// A matching signature proves the payment really came from Razorpay.
export const isValidPaymentSignature = ({ orderId, paymentId, signature }) => {
  if (!orderId || !paymentId || typeof signature !== "string") return false;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return (
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  );
};
