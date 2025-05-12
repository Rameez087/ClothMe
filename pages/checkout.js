import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "@/Component/navbar";
import CartContext from "./context/CartContext";

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && session?.user?.email) {
      fetchUserData(session.user.email);
    }
  }, [status, session]);

  useEffect(() => {
    // Get cart items from localStorage as a fallback
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else if (cartContext?.cartItems) {
      setCartItems(cartContext.cartItems);
    }
  }, [cartContext]);

  const fetchUserData = async (email) => {
    try {
      const res = await fetch(`/api/get-user-details?email=${email}`);
      const data = await res.json();
      
      if (data.success) {
        const { name, address, phone } = data.user;
        setForm({
          name: name || "",
          address: address || "",
          phone: phone || ""
        });
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!session?.user?.email) {
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to checkout.");
      return;
    }

    try {
      // First update user details in the database
      const updateRes = await fetch("/api/update-user-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          ...form
        }),
      });

      const updateData = await updateRes.json();
      
      if (!updateData.success) {
        throw new Error(updateData.message);
      }

      // Then proceed with order submission
      const orderData = {
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: session.user.email,
        items: cartItems.map(item => item._id),
        totalAmount: cartItems.reduce((total, item) => total + item.price, 0)
      };

      const orderRes = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderRes.json();

      if (orderResult.success) {
        // Store orderId for payment page to update status
        if (orderResult.orderId) {
          localStorage.setItem('currentOrderId', orderResult.orderId);
        }
        if (orderResult.trackingId) {
          localStorage.setItem('currentTrackingId', orderResult.trackingId);
        }
        router.push("/payment");
      } else {
        throw new Error(orderResult.message);
      }
    } catch (error) {
      console.error("Error in checkout process:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <>
        <Navbar />
        <div className="checkout-container">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="checkout-container">
          <div>Error: {error}</div>
        </div>
      </>
    );
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <Navbar />
      <div className="checkout-page">
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
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
