import { getToken } from "next-auth/jwt";
import { connectToDB } from "../../lib/mongodb";
import { ObjectId } from "mongodb"; 

const secret = "any-string-will-work-in-development"; // Same as in [...nextauth].js

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

try {
    const db = await connectToDB();

    const ordersRaw = await db
      .collection("orders")
      .find({ email: token.email })
      .sort({ date: -1 })
      .toArray();

    const productIds = ordersRaw.flatMap(order => order.items.map(id => new ObjectId(id)));

    const products = await db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    const productMap = Object.fromEntries(products.map(p => [p._id.toString(), p]));

    const orders = ordersRaw.map(order => ({
      ...order,
      items: order.items.map(id => productMap[id.toString()] || { name: "Unknown Product", image: "" })
    }));

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

