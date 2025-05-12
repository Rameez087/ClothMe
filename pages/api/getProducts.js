import { connectToDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDB();
    const products = await db.collection('products').find({}).toArray();
    
    console.log("Fetched products:", products);

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
}
