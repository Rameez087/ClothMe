import Navbar from "@/Component/navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function OrderHistory() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/getHistory")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrders(data.orders);
          }
          setLoading(false);
        });
    }
  }, [status]);

  if (status === "loading" || loading) return <div style={centered}>Loading...</div>;
  if (!session) return (<><Navbar/>
  <div style={centered}>Please log in to view your order history.</div></>);

  return (
    <>
      <Navbar />
      <div style={container}>
        <h1 style={heading}>Your Order History</h1>
        {orders.length === 0 ? (
          <p style={noOrders}>No orders found.</p>
        ) : (
          <div style={tableWrapper}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Order ID</th>
                  <th style={th}>Date</th>
                  <th style={th}>Status</th>
                  <th style={th}>Items</th>
                  <th style={th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={row}>
                    <td style={td}>{order.orderId}</td>
                    <td style={td}>{new Date(order.date).toLocaleDateString()}</td>
                    <td style={{ ...td, color: getStatusColor(order.status), fontWeight: 600 }}>
                      {order.status}
                    </td>
                    <td style={td}>
                        <ul style={{ margin: 0, padding: 0, listStyleType: "disc", paddingLeft: "1rem" }}>
                            {order.items?.map((item, i) => (
                            <li key={i}>{item.name}</li>
                            ))}
                        </ul>
                    </td>
                    <td style={td}>${order.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// Styling
const container = {
  padding: "2rem",
  maxWidth: "1000px",
  margin: "0 auto",
};

const heading = {
  fontSize: "2rem",
  marginBottom: "1.5rem",
  color: "#333",
};

const noOrders = {
  fontSize: "1.2rem",
  color: "#666",
};

const tableWrapper = {
  overflowX: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  backgroundColor: "#fff",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px",
};

const th = {
  padding: "1rem",
  textAlign: "left",
  backgroundColor: "#f9f9f9",
  borderBottom: "2px solid #e0e0e0",
  fontWeight: "600",
  color: "#444",
};

const td = {
  padding: "1rem",
  borderBottom: "1px solid #f0f0f0",
  color: "#333",
  verticalAlign: "top",
};

const row = {
  transition: "background 0.2s ease",
};

const centered = {
  textAlign: "center",
  padding: "4rem",
  fontSize: "1.2rem",
};

// Status color helper
const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "#007bff";
    case "delivered":
      return "#28a745";
    case "returned":
      return "#dc3545";
    case "pending":
    default:
      return "#ffc107";
  }
};
