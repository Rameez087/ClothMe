// /pages/checkout.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      setIsGuest(true); // Guest checkout
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Log the form data to ensure it's correct
    console.log("Submitting form data:", form);

    const orderData = {
      name: form.name,
      address: form.address,
      phone: form.phone,
      userId: isGuest ? null : "user-id-from-db", // Pass null for guest users
    };

    try {
      const res = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      // Check for success and handle accordingly
      if (data.success) {
        console.log("Order submitted successfully:", data);
        router.push("/payment");
      } else {
        console.error("Failed to submit order:", data.message);
        alert("Failed to submit order: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was an error submitting the order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Enter Shipping Details</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}
