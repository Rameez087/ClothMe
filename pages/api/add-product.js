// // pages/api/add-product.js
// import clientPromise from '../../lib/mongodb';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const client = await clientPromise;
//       const db = client.db(); // It will use `productsApp` from the URI
//       const collection = db.collection('products');

//       const newProduct = req.body; // Expecting JSON like { name: "T-shirt", price: 20 }
//       const result = await collection.insertOne(newProduct);

//       res.status(200).json({ success: true, insertedId: result.insertedId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Insert failed' });
//     }
//   } else {
//     res.status(405).json({ message: 'Only POST requests allowed' });
//   }
// }
