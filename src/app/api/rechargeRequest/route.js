import { connect } from "@/dbconfig/db.js"; // MongoDB connection function
import Recharge from "@/models/rechargeSchema.js"; // Recharge model (schema)
import User from "@/models/userSchema.js"; // User model (schema)

export async function GET(req) {
  try {
    // Connect to the database
    await connect();

    // Fetch all recharge requests
    const requests = await Recharge.find();

    // Create an array to store the enriched requests
    const enrichedRequests = [];

    // Loop through each recharge request and fetch the user details
    for (const request of requests) {
      // Fetch the user details for the current request's userId
      const userDetails = await User.findOne({ userId: request.userId });

      // Check if the user exists and add the user details to the request
      enrichedRequests.push({
        userId: request.userId,
        userEmail: userDetails ? userDetails.email : "Unknown",
        userPhone: userDetails ? userDetails.mobileNumber : "Unknown",
        amount: request.amount,
        utrNumber: request.utrNumber,
        status: request.status,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
      });
    }

    // Return the enriched list of recharge requests with user details
    return new Response(JSON.stringify(enrichedRequests), { status: 200 });
  } catch (error) {
    console.error("Error fetching recharge requests:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching recharge requests" }),
      { status: 500 }
    );
  }
}
