import { connectToDB } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; // Add this line to import ObjectId

export default async function handler(req, res) {
  const { id } = req.query; // Get the id from the query params

  try {
    const db = await connectToDB();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) }); // Using ObjectId to find the product

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log("Fetched product:", product);

    res.status(200).json({ success: true, product }); // Return the product found
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
}
