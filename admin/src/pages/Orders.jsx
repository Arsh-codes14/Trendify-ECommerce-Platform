import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const STATUSES = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/order/list", {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Could not load orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (orderId, status) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? response.data.order : order))
        );
        toast.success(`Order marked as ${status}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Could not update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const revenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.amount, 0);
  const pending = orders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order.status)
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Orders</h3>
        <button
          onClick={fetchAllOrders}
          className="px-4 py-1.5 text-sm bg-white border rounded-md hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-3">
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-sm text-gray-500">Total orders</p>
          <p className="text-2xl font-semibold text-gray-800">{orders.length}</p>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-sm text-gray-500">To be fulfilled</p>
          <p className="text-2xl font-semibold text-gray-800">{pending}</p>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-sm text-gray-500">Revenue (excl. cancelled)</p>
          <p className="text-2xl font-semibold text-gray-800">{currency(revenue)}</p>
        </div>
      </div>

      {loading && <p className="py-10 text-center">Loading orders...</p>}
      {!loading && orders.length === 0 && (
        <p className="py-10 text-center">No orders yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start p-5 text-xs sm:text-sm bg-white border rounded-lg"
          >
            <img className="w-12" src={assets.parcel_icon} alt="Order" />
            <div>
              {order.items.map((item, index) => (
                <p key={index} className="py-0.5">
                  {item.name} × {item.quantity} <span className="text-gray-400">({item.size})</span>
                </p>
              ))}
              <p className="mt-3 mb-1 font-medium text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state}, {order.address.country} -{" "}
                {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
              <p className="mt-2">Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Collected" : "Pending"}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
            </div>
            <p className="font-semibold text-gray-800">{currency(order.amount)}</p>
            <select
              value={order.status}
              onChange={(e) => statusHandler(order._id, e.target.value)}
              className="p-2 font-medium bg-gray-50 border rounded-md"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
