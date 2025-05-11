import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST requests allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    const { email, password, name } = req.body;

    // Check if email already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const result = await users.insertOne({
      email,
      password,
      name,
      address: "",
      phone: "",
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertedId,
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
