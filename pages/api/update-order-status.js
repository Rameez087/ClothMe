import { connectToDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
  const { orderId, status } = req.body;
  if (!orderId || !status) {
    return res.status(400).json({ success: false, message: "orderId and status are required" });
  }
  try {
    const db = await connectToDB();
    const result = await db.collection("orders").updateOne(
      { orderId },
      { $set: { status } }
    );
    if (result.modifiedCount === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
} 