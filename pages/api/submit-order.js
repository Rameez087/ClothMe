// /pages/api/submit-order.js
import clientPromise from "../../lib/mongodb";  // Ensure MongoDB is connected

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, address, phone, userId } = req.body;

      // Check if the required fields are provided
      if (!name || !address || !phone) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("orders");  // Ensure you're using the correct collection

      // Create a new order object
      const newOrder = {
        name,
        address,
        phone,
        userId: userId || null,  // Use null for guest users
        createdAt: new Date(),
      };

      // Insert the new order into the database
      const result = await collection.insertOne(newOrder);

      // Respond with success
      return res.status(200).json({ success: true, message: "Order placed successfully", orderId: result.insertedId });
    } catch (error) {
      console.error("Error placing order:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }
}
