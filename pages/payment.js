import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/Component/navbar";
import CartContext from "./context/CartContext";

export default function PaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [cardError, setCardError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const router = useRouter();
  const cartContext = useContext(CartContext);

  useEffect(() => {
    // Get cart items from localStorage as a fallback
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else if (cartContext?.cartItems) {
      setCartItems(cartContext.cartItems);
    }
  }, [cartContext]);

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  function isValidExpiry(expiry) {
    // Format: MM/YY
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/').map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // last two digits
    const currentMonth = now.getMonth() + 1; // 1-based
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setCardError("");
    setExpiryError("");
    setCvvError("");

    if (paymentDetails.cardNumber.length !== 16) {
      setCardError("Card number must be exactly 16 digits.");
      valid = false;
    }
    if (!isValidExpiry(paymentDetails.expiry)) {
      setExpiryError("Please enter a valid expiry date (MM/YY) that is not in the past.");
      valid = false;
    }
    if (!/^[0-9]{3}$/.test(paymentDetails.cvv)) {
      setCvvError("CVV must be exactly 3 digits.");
      valid = false;
    }
    if (!valid) return;

    setIsProcessing(true);

    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentDetails),
    });

    const data = await res.json();
    if (data.success) {
      setOrderStatus("paid");
      // Update order status to confirmed
      const orderId = localStorage.getItem('currentOrderId');
      if (orderId) {
        await fetch("/api/update-order-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, status: "confirmed" }),
        });
        localStorage.removeItem('currentOrderId');
      }
      // Get trackingId from localStorage and redirect
      const trackingId = localStorage.getItem('currentTrackingId');
      localStorage.removeItem('currentTrackingId');
      // Clear cart after successful payment
      localStorage.removeItem('cartItems');
      if (cartContext?.setCartItems) {
        cartContext.setCartItems([]);
      }
      if (trackingId) {
        router.push(`/order-status?trackingId=${trackingId}`);
      } else {
        router.push(`/order-status`);
      }
    } else {
      alert("Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="checkout-page">
        <div className="checkout-container">
          <h2>Enter Payment Details</h2>
          <form onSubmit={handlePaymentSubmit}>
            <input
              type="text"
              placeholder="Card Number"
              value={paymentDetails.cardNumber}
              onChange={e => {
                // Only allow numbers, max 16 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                setPaymentDetails({ ...paymentDetails, cardNumber: value });
              }}
              maxLength={16}
              required
            />
            {cardError && <div style={{ color: 'red', fontSize: '0.9rem' }}>{cardError}</div>}
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={paymentDetails.expiry}
              onChange={e => {
                // Only allow numbers and slash, format MM/YY, max 5 chars
                let value = e.target.value.replace(/[^0-9/]/g, '');
                if (value.length === 2 && paymentDetails.expiry.length === 1) {
                  value += '/';
                }
                value = value.slice(0, 5);
                setPaymentDetails({ ...paymentDetails, expiry: value });
              }}
              maxLength={5}
              required
            />
            {expiryError && <div style={{ color: 'red', fontSize: '0.9rem' }}>{expiryError}</div>}
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={e => {
                // Only allow numbers, max 3 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                setPaymentDetails({ ...paymentDetails, cvv: value });
              }}
              maxLength={3}
              required
            />
            {cvvError && <div style={{ color: 'red', fontSize: '0.9rem' }}>{cvvError}</div>}
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                <div className="order-status">
                  <strong>Status:</strong> <span style={{ color: orderStatus === 'pending' ? 'orange' : 'green' }}>{orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
