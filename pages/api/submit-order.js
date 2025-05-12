import { connectToDB } from "../../lib/mongodb";

function generateOrderId() {
  return Math.random().toString(36).substr(2, 8).toLowerCase();
}

function generateTrackingId() {
  return Math.random().toString(36).substr(2, 10).toLowerCase();
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, address, phone, email, items, totalAmount } = req.body;

    if (!name || !address || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    try {
      const db = await connectToDB();
      const orderId = generateOrderId();
      const trackingId = generateTrackingId();

      const order = {
        orderId,
        trackingId,
        email,
        items: items || [],
        totalAmount: totalAmount || 0,
        status: "pending",
        date: new Date(),
      };

      const result = await db.collection("orders").insertOne(order);

      return res.status(200).json({ success: true, orderId, trackingId });
    } catch (error) {
      console.error("Error submitting order:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error submitting order" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
