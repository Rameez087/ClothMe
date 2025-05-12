import { connectToDB } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; 

export default async function handler(req, res) {
  const { id } = req.query; 

  try {
    const db = await connectToDB();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) }); 

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log("Fetched product:", product);

    res.status(200).json({ success: true, product }); 
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
}
