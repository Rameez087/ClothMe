import { connectToDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
  const { trackingId } = req.query;
  if (!trackingId) {
    return res
      .status(400)
      .json({ success: false, message: "trackingId is required" });
  }
  try {
    const db = await connectToDB();
    const order = await db.collection("orders").findOne({ trackingId });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
