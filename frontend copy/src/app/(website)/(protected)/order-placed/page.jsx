"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderPlacedPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");
  console.log("paymentID", paymentId)
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      axios.get(`/api/orders/${orderId}`)
        .then((res) => {
          setOrder(res.data.order);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [orderId]);

  console.log("order", order)

  if (loading) return <div className="p-6 text-center mt-20">Loading your order...</div>;
  if (!order) return <div className="p-6 text-center mt-20">Order not found.</div>;

  return (
   <div className="max-w-3xl mx-auto p-6 mt-20 bg-white shadow-md rounded-lg">
  <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
  <p className="mb-4 text-gray-700">
    Your order has been placed successfully.
  </p>
  <p className="mb-4 text-sm text-gray-500">
    <strong>Order ID:</strong> {order._id}
  </p>

  {/* Shipping Info */}
  <div className="bg-gray-50 p-4 rounded-md border mb-6">
    <h2 className="font-semibold text-lg mb-2">🚚 Shipping Information</h2>
    <p>{order.shippingInfo.fullName}</p>
    <p>{order.shippingInfo.address}, {order.shippingInfo.city}</p>
    <p>{order.shippingInfo.state} - {order.shippingInfo.postalCode}, {order.shippingInfo.country}</p>
    <p>📞 {order.shippingInfo.phone}</p>
  </div>

  {/* Payment Info */}
  <div className="bg-gray-50 p-4 rounded-md border mb-6">
    <h2 className="font-semibold text-lg mb-2">💳 Payment Details</h2>
    {
      order.paymentInfo  && (<p>Method: <strong>{order?.paymentInfo?.method}</strong></p>)
    }
    {
      order.paymentInfo  && ( <p>Transaction ID: <strong>{order?.paymentInfo?.id || "N/A"}</strong></p>)
    }
    
   
    <p className="text-lg font-bold text-gray-800 mt-2">Total: ₹{order?.totalAmount}</p>
  </div>

  {/* Ordered Items */}
  <div className="bg-gray-50 p-4 rounded-md border">
    <h2 className="font-semibold text-lg mb-4">🛒 Ordered Items</h2>
    <div className="divide-y divide-gray-200">
      {order?.items.map((item, index) => (
        <div key={index} className="flex items-center gap-4 py-4">
          {
            console.log("items", item)
          }
          <img
            src={item.productId.image}
            alt={item.productId.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-800">{item.productId.title}</p>
            <p className="text-sm text-gray-500">
              ₹{item.productId.price} × {item.quantity} = ₹{item.productId.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
