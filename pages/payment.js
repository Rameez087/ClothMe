import { useState } from "react";
import { useRouter } from "next/router";

export default function PaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentDetails),
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/order-status?trackingId=${data.trackingId}`);
    } else {
      alert("Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Enter Payment Details</h2>
      <form onSubmit={handlePaymentSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Expiry Date"
          value={paymentDetails.expiry}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
        />
        <input
          type="text"
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
        />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
