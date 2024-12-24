import { connect } from "@/dbconfig/db.js";
import Recharge from "@/models/rechargeSchema.js";
import User from "@/models/userSchema.js";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    // Connect to MongoDB database
    await connect();

    // Fetch query parameters using nextUrl.searchParams
    const { page = 1, limit = 10 } = req.nextUrl.searchParams;
    const skip = (page - 1) * limit;

    // Fetch the recharge requests, sorted by creation date, and skip/pagination applied
    const requests = await Recharge.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by the latest requests

    // Get the total number of recharge requests for pagination
    const totalRequests = await Recharge.countDocuments();
    const totalPages = Math.ceil(totalRequests / limit);

    // Enrich recharge requests with user details
    const enrichedRequests = await Promise.all(
      requests.map(async (request) => {
        // Fetch user details based on userId
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

    // Return the response with enriched recharge requests
    return new Response(
      JSON.stringify({
        requests: enrichedRequests, // List of recharge requests with user details
        totalPages, // Total number of pages for pagination
        currentPage: Number(page), // Current page number
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching recharge requests:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching recharge requests" }),
      { status: 500 }
    );
  }
}
