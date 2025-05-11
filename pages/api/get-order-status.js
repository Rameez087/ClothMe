// pages/api/get-order-status.js

export default async function handler(req, res) {
  const { trackingId } = req.query;

  if (!trackingId) {
    return res.status(400).json({ success: false, message: 'Tracking ID is required' });
  }

  // Fetch the order status from your database or some other service
  try {
    // Simulate a fetched order status (this could be a database query in a real application)
    const orderStatus = 'Shipped';  // For example, you can return the order status based on the trackingId.

    return res.status(200).json({ success: true, status: orderStatus });
  } catch (error) {
    console.error('Error fetching order status:', error);
    return res.status(500).json({ success: false, message: 'Error fetching order status' });
  }
}
