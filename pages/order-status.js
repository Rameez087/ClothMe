import { useState, useEffect } from 'react';

export default function OrderStatusPage() {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Added state to handle errors

  useEffect(() => {
    // Fetch order status logic here (for example from an API)
    const fetchOrderStatus = async () => {
      try {
        const trackingId = 710189; // Example tracking ID
        const url = `/api/get-order-status?trackingId=${trackingId}&_=${new Date().getTime()}`;  // Cache-busting parameter

        const res = await fetch(url);

        const contentType = res.headers.get("content-type");

        // Check if the response is JSON
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error('Expected JSON, but got something else.');
        }

        const data = await res.json();

        // If there's no status in the response, handle that as an error
        if (!data.status) {
          throw new Error('Order status not found');
        }

        setOrderStatus(data.status);  // Set the order status after fetching data
      } catch (error) {
        console.error('Error fetching order status:', error);
        setError(error.message || 'Something went wrong');  // Set the error message
      } finally {
        setLoading(false);  // Stop the loading state
      }
    };

    fetchOrderStatus();
  }, []);  // Empty dependency array means this will run once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Order Status</h1>
      <p>Your order status is: {orderStatus}</p>
    </div>
  );
}
