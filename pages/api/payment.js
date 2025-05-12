import { processPayment } from "../../lib/payment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cardNumber, expiry, cvv } = req.body;

    try {
      const paymentResponse = await processPayment(cardNumber, expiry, cvv);

      if (paymentResponse.success) {
        const trackingId = Math.floor(Math.random() * 1000000);
        res.status(200).json({ success: true, trackingId });
      } else {
        res.status(400).json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
