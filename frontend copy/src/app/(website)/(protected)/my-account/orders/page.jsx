"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersPage() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/orders");
      return res.data.orders;
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
        ❌ Failed to load orders. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 shadow-sm bg-card hover:shadow-md transition"
            >
              <div className="flex justify-between gap-4 items-center">
                <div className="space-y-1 text-sm w-full">
                  <p className="text-muted-foreground">
                    Order ID: <span className="font-medium">{order._id}</span>
                  </p>

                  {order.items.map((item) => (
                    <div key={item?.productId?._id} className="flex items-center justify-between mb-4">
                      <p className="font-semibold text-base ">
                        {item?.productId?.title}<br/>
                        ₹{item?.productId?.price} × {item.quantity}
                      </p>
                      <div className="">
                        <img
                          src={item?.productId.image}
                          alt="Product"
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                  
                      </div>
                     
                    </div>
                  ))}

                  {
                    console.log("---", order?.totalAmount)
                    //  order?.items?.reduce((prev, current)=> prev + (current?.quantity * current?.price), 0)
                  }
                  <h3 className="font-semibold">Amount {order?.totalAmount}</h3>
                  <p className="text-xs text-green-600 font-medium pt-1">
                    ● {order?.orderStatus} —{" "}
                    {format(new Date(order?.updatedAt), "PPP")}
                  </p>
                </div>

                {/* <img
                  src={order?.items[0]?.productId.image}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-md border"
                /> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
