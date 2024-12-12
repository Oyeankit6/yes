import { connect } from "@/dbconfig/db.js";
import Recharge from "@/models/rechargeSchema.js";
import User from "@/models/userSchema.js";

export async function GET(req) {
  try {
    await connect();
    console.log("Database connected successfully");

    // Fetch recharge requests
    const requests = await Recharge.find();
    console.log("Recharge requests:", requests);

    const enrichedRequests = await Promise.all(
      requests.map(async (request) => {
        try {
          const userDetails = await User.findOne({ userId: request.userId });
          console.log("User details for request:", request.userId, userDetails);
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
        } catch (err) {
          console.error(`Error fetching user details for userId ${request.userId}:`, err);
          return {
            userId: request.userId,
            userEmail: "Unknown",
            userPhone: "Unknown",
            amount: request.amount,
            utrNumber: request.utrNumber,
            status: request.status,
            createdAt: request.createdAt,
            updatedAt: request.updatedAt,
          };
        }
      })
    );

    console.log("Enriched recharge requests:", enrichedRequests);

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
