// src/app/(protected)/my-account/address/page.js

export default function AddressPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Address</h2>
      <div className="border rounded-xl p-4 shadow-sm">
        <p><span className="font-semibold">Home:</span> 123 Main St, New Delhi, 110001</p>
        <p><span className="font-semibold">Phone:</span> +91-9876543210</p>
      </div>
    </div>
  );
}
