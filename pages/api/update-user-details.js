import { connectToDB } from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, name, address, phone } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const db = await connectToDB();
    const updateData = {};
    
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (phone) updateData.phone = phone;

    const result = await db.collection('users').updateOne(
      { email },
      { $set: updateData },
      { upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'User details updated successfully'
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
} 