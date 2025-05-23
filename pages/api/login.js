import { connectToDB } from '../../lib/mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    let client;

    try {
      const db = connectToDB()
      const orders = await db
      const collection = db.collection('users');

      const user = await collection.findOne({ email, password });

      if (user) {
        return res.status(200).json({ success: true, message: 'Login successful', user });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ success: false, message: 'Login failed' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
