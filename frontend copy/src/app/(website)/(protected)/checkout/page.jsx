"use client";

import { useState } from "react";
import { useCartHook } from "@/hooks/useCartHook";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import axios from "axios";
import { CheckoutSchema } from "@/schema/userFormSchema";
import axiosInstance from "@/lib/axiosInstance";

const CheckoutPage = () => {
  const { getCartTotal, clearCart, cart } = useCartHook();
  const router = useRouter();
  const total = getCartTotal();
  const [useSameAddress, setUseSameAddress] = useState(true);

  const initialValues = {
    billingAddress: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      country: "",
    },
    shippingAddress: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      country: "",
    },
    // shippingSameAsBilling: true,
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePlaceOrder = async (values) => {
    console.log("values", values);

      // Step 1: Create Razorpay order on server
  const res = await axiosInstance.post("/api/checkout", values);
  console.log("res", res)

    // return;
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) return alert("Failed to load Razorpay");

    const { data } = await axios.post("/api/checkout/razorpay-order", {
      amount: total,
    });

    if (!data?.id) return alert("Razorpay order failed");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Your Store",
      description: "Order Payment",
      order_id: data.id,
      handler: async function (response) {
        const { data: verifyData } = await axios.post(
          "/api/checkout/verify",
          response
        );

        if (!verifyData.success) return alert("Payment verification failed");

        const orderPayload = {
          shippingInfo: values.shipping,
          billingInfo: useSameAddress ? values.shipping : values.billing,

          paymentDetails: verifyData.payment,
        };

        const { data: orderData } = await axios.post(
          "/api/orders",
          orderPayload
        );
        console.log("orderData", orderData)
        if (!orderData.success) return alert("Order creation failed");

        clearCart();
        router.push(`/order-placed?orderId=${orderData?.order?._id}`);
      },
      prefill: {
        name: values.shipping.fullName,
        email: "demo@example.com",
        contact: values.shipping.phone,
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="h1 mb-5">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-border rounded-2xl shadow-sm p-6 space-y-6">
          <Formik
            initialValues={initialValues}
            // validationSchema={CheckoutSchema}
            onSubmit={handlePlaceOrder}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <h2 className="h2">Shipping Information</h2>
                  {Object.entries({
                    fullName: "Full Name",
                    address: "Address",
                    city: "City",
                    state: "State",
                    postalCode: "Postal Code",
                    phone: "Phone",
                    country: "Country",
                  }).map(([key, label]) => (
                    <div key={`shipping.${key}`}>
                      <Label htmlFor={`shipping.${key}`}>{label}</Label>
                      <Field
                        as={Input}
                        id={`shipping.${key}`}
                        name={`shipping.${key}`}
                        type="text"
                      />
                      <p className="text-sm text-red-500 mt-1">
                        <ErrorMessage name={`shipping.${key}`} />
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={useSameAddress}
                      onChange={() => setUseSameAddress(!useSameAddress)}
                    />
                    <span className="text-sm">
                      Billing address is same as shipping
                    </span>
                  </label>
                </div>

                {!useSameAddress && (
                  <div>
                    <h2 className="h2">Billing Information</h2>
                    {Object.entries({
                      fullName: "Full Name",
                      address: "Address",
                      city: "City",
                      state: "State",
                      postalCode: "Postal Code",
                      phone: "Phone",
                      country: "Country",
                    }).map(([key, label]) => (
                      <div key={`billing.${key}`}>
                        <Label htmlFor={`billing.${key}`}>{label}</Label>
                        <Field
                          as={Input}
                          id={`billing.${key}`}
                          name={`billing.${key}`}
                          type="text"
                        />
                        <p className="text-sm text-red-500 mt-1">
                          <ErrorMessage name={`billing.${key}`} />
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order & Pay"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="bg-white border border-border rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="h2">Order Summary</h2>
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image || "https://placehold.co/80"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-sm">
                ₹{(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-lg font-semibold pt-4 border-t">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
