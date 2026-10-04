// INFO: Convert between Postgres rows (snake_case) and the API's JSON shape,
// so the storefront and admin keep the same contract (_id, subCategory, ...).

export const toProduct = (row) => ({
  _id: row.id,
  name: row.name,
  description: row.description,
  price: Number(row.price),
  image: row.image || [],
  category: row.category,
  subCategory: row.sub_category,
  sizes: row.sizes || [],
  bestSeller: row.best_seller,
  date: new Date(row.created_at).getTime(),
});

export const toProductRow = (product) => ({
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.image,
  category: product.category,
  sub_category: product.subCategory,
  sizes: product.sizes,
  best_seller: Boolean(product.bestSeller),
  ...(product.date && { created_at: new Date(product.date).toISOString() }),
});

export const toOrder = (row) => ({
  _id: row.id,
  userId: row.user_id,
  items: row.items,
  subtotal: Number(row.subtotal),
  deliveryFee: Number(row.delivery_fee),
  amount: Number(row.amount),
  address: row.address,
  status: row.status,
  paymentMethod: row.payment_method,
  payment: row.payment,
  razorpayPaymentId: row.razorpay_payment_id || null,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const ORDER_STATUSES = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];
