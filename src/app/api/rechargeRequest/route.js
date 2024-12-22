import { connect } from "@/dbconfig/db.js";
import Recharge from "@/models/rechargeSchema.js";
import User from "@/models/userSchema.js";

export default async function handler(req, res) {
  await connect();

  if (req.method === "GET") {
    try {
      const requests = await Recharge.find();
      res.status(200).json(requests);
    } catch (error) {
      console.error("Error fetching recharge requests:", error);
      res.status(500).json({ message: "Error fetching recharge requests" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
