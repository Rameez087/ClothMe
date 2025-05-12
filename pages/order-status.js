import Navbar from "@/Component/navbar";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import CartContext from "./context/CartContext";

export default function OrderStatusPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (window) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    }
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const trackingId = router.query.trackingId;
        if (!trackingId) return;
        const url = `/api/get-order-status?trackingId=${trackingId}&_=${new Date().getTime()}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.order) throw new Error("Order not found");
        setOrder(data.order);
        if (data.order.items && data.order.items.length > 0) {
          const allProducts = cartContext?.cartItems?.length
            ? cartContext.cartItems
            : JSON.parse(localStorage.getItem("cartItems") || "[]");
          let productDetails = allProducts.filter((p) =>
            data.order.items.includes(p._id)
          );
          if (productDetails.length < data.order.items.length) {
            const prodRes = await fetch("/api/getProducts");
            const prodData = await prodRes.json();
            if (prodData.success) {
              productDetails = prodData.products.filter((p) =>
                data.order.items.includes(p._id)
              );
            }
          }
          setProducts(productDetails);
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [router.query.trackingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
          color: "#b00020",
          fontSize: "1.2rem",
        }}
      >{`Error: ${error}`}</div>
    );
  }

  const statusColor =
    order.status === "confirmed"
      ? "#27ae60"
      : order.status === "pending"
      ? "#f39c12"
      : "#b00020";

  return (
    <div
      style={{
        minHeight: "50vh",
        background: "linear-gradient(135deg, #ffe0ec 0%, #f9f6ff 100%)",
        paddingTop: "80px",
        boxSizing: "border-box",
      }}
    >
      <Navbar />
      <div
        style={{
          maxWidth: "700px",
          margin: "3rem auto",
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.13)",
          padding: "2.5rem 2rem",
          fontFamily: "Segoe UI, Arial, sans-serif",
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            fontWeight: 700,
            fontSize: "2.2rem",
            color: "#d72660",
            letterSpacing: "1px",
          }}
        >
          Order Details
        </h2>
        <div
          style={{
            marginBottom: "1.2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <strong>Order ID:</strong>{" "}
            <span style={{ fontFamily: "monospace", color: "#333" }}>
              {order.orderId}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <strong>Tracking ID:</strong>{" "}
            <span style={{ fontFamily: "monospace", color: "#333" }}>
              {order.trackingId}
            </span>
          </div>
        </div>
        <div style={{ marginBottom: "1.2rem" }}>
          <strong>Status:</strong>{" "}
          <span
            style={{
              background: statusColor,
              color: "#fff",
              borderRadius: "8px",
              padding: "0.3em 1em",
              fontWeight: 600,
              fontSize: "1rem",
              marginLeft: "0.5em",
              letterSpacing: "1px",
              textTransform: "capitalize",
            }}
          >
            {order.status}
          </span>
        </div>
        <div style={{ marginBottom: "1.2rem" }}>
          <strong>Shipping Address:</strong>{" "}
          <span style={{ color: "#555" }}>{order.address}</span>
        </div>
        <div style={{ marginBottom: "1.2rem" }}>
          <strong>Phone:</strong>{" "}
          <span style={{ color: "#555" }}>{order.phone}</span>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <strong>Total Amount:</strong>{" "}
          <span style={{ color: "#d72660", fontWeight: 700 }}>
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <strong style={{ fontSize: "1.1rem", color: "#222" }}>
            Products:
          </strong>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            {products.length === 0 ? (
              <div style={{ color: "#888" }}>No product details available.</div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    background: "#faf7ff",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(215,38,96,0.07)",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "220px",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "0.7rem",
                      boxShadow: "0 2px 8px #f9c6d3",
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#d72660",
                      fontSize: "1.1rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {product.name}
                  </div>
                  <div style={{ color: "#333", fontSize: "1rem" }}>
                    Price:{" "}
                    <span style={{ fontWeight: 700 }}>${product.price}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <button
          style={{
            marginTop: "2.5rem",
            alignSelf: "center",
            background: "linear-gradient(90deg, #d72660 0%, #ffb6b9 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            padding: "1rem 2.5rem",
            fontSize: "1.2rem",
            fontWeight: 600,
            letterSpacing: "1px",
            boxShadow: "0 4px 16px rgba(215,38,96,0.13)",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.2s",
          }}
          onClick={() => router.push("/try_on")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
