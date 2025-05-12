import { getSession } from "next-auth/react";
import { connectToDB } from "../../lib/mongodb";
import { ObjectId } from "mongodb"; 


export default async function handler(req, res) {


try {

    const db = await connectToDB();
    console.log("1")
   const session = await getSession({ req });
   const email = session.user.email; 
  console.log("email")
  console.log(email)
    console.log("2")

    const ordersRaw = await db
      .collection("orders")
      .find({ email: email })
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

