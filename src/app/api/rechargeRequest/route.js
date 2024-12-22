import { connect } from "@/dbconfig/db.js";
import Recharge from "@/models/rechargeSchema.js";
import User from "@/models/userSchema.js";

export async function GET(req) {
  try {
    await connect();

    // Fetch recharge requests
    const requests = await Recharge.find();

    const enrichedRequests = await Promise.all(
      requests.map(async (request) => {
        const userDetails = await User.findOne({ userId: request.userId });
        return {
          userId: request.userId,
          userEmail: userDetails?.email || "Unknown",
          userPhone: userDetails?.mobileNumber || "Unknown",
          amount: request.amount,
          utrNumber: request.utrNumber,
          status: request.status,
          createdAt: request.createdAt,
          updatedAt: request.updatedAt,
        };
      })
    );

    return new Response(JSON.stringify(enrichedRequests), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recharge requests:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching recharge requests" }),
      { status: 500 }
    );
  }
}
