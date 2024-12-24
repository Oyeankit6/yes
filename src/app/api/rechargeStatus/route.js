import { connect } from "@/dbconfig/db.js"; // MongoDB connection
import Recharge from "@/models/rechargeSchema.js"; // Recharge schema
import User from "@/models/userSchema.js"; // User schema

export async function POST(req) {
  try {
    // Parse the request body
    const { id, amount, status } = await req.json();

    // Log incoming request data for debugging
    console.log("Received request data:", { id, amount, status });

    // Validate input data
    if (
      !id ||
      !amount ||
      !status ||
      !["Approved", "Rejected"].includes(status)
    ) {
      return new Response(
        JSON.stringify({
          message: "Invalid request. Missing or incorrect parameters.",
        }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connect();

    // Find the recharge request with "Pending" status
    const rechargeRequest = await Recharge.findOne({
      userId: id,
      status: "Pending",
    });

    // Check if the recharge request exists and is "Pending"
    if (!rechargeRequest) {
      return new Response(
        JSON.stringify({ message: "No pending recharge request found." }),
        { status: 404 }
      );
    }

    // Update the recharge request status
    rechargeRequest.status = status; // Update the status
    await rechargeRequest.save(); // Save the updated recharge request

    // Handle "Approved" logic: Update user balance
    if (status === "Approved") {
      const user = await User.findOne({ userId: id });

      if (!user) {
        return new Response(JSON.stringify({ message: "User not found." }), {
          status: 404,
        });
      }

      // Update user's balance
      user.balance += amount;
      await user.save(); // Save the updated user document

      // Return success with updated recharge request and user balance
      return new Response(
        JSON.stringify({
          message: `Recharge request ${status} successfully.`,
          request: rechargeRequest, // Updated recharge request
          updatedUser: { balance: user.balance },
        }),
        { status: 200 }
      );
    }

    // Handle "Rejected" logic: Just return the updated recharge request
    return new Response(
      JSON.stringify({
        message: `Recharge request ${status} successfully.`,
        request: rechargeRequest,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing recharge status:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
