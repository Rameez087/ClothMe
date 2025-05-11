// pages/api/getProducts.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name here if necessary
    const products = await db.collection('products').find({}).toArray(); // Fetch all products
    console.log(products)
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
}
