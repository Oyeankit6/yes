import { connect } from "@/dbconfig/db.js"; // MongoDB connection
import Recharge from "@/models/rechargeSchema.js"; // Recharge schema
import User from "@/models/userSchema.js"; // User schema

export async function POST(req) {
  try {
    // Parse the request body
    const { id, amount, status } = await req.json();

    // Validate input data
    if (!id || !status || !["Approved", "Rejected"].includes(status)) {
      return new Response(
        JSON.stringify({
          message: "Invalid request. Missing or incorrect parameters.",
        }),
        { 
          status: 400,
          headers: {
            "Cache-Control": "no-store", // Disable caching
          }
        }
      );
    }

    if (status === "Approved" && (!amount || amount <= 0)) {
      return new Response(
        JSON.stringify({ message: "Invalid amount for approval." }),
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store", // Disable caching
          }
        }
      );
    }

    // Connect to the database
    await connect();

    // Find the recharge request with "Pending" status
    const rechargeRequest = await Recharge.findOneAndUpdate(
      { userId: id, status: "Pending" },
      { status }, // Update the status
      { new: true } // Return the updated document
    );

    if (!rechargeRequest) {
      return new Response(
        JSON.stringify({ message: "No pending recharge request found." }),
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store", // Disable caching
          }
        }
      );
    }

    // Handle "Approved" logic: Update user balance
    if (status === "Approved") {
      const user = await User.findOneAndUpdate(
        { userId: id },
        { $inc: { balance: amount } }, // Increment balance
        { new: true } // Return the updated document
      );

      if (!user) {
        return new Response(
          JSON.stringify({ message: "User not found." }),
          {
            status: 404,
            headers: {
              "Cache-Control": "no-store", // Disable caching
            }
          }
        );
      }

      return new Response(
        JSON.stringify({
          message: `Recharge request ${status} successfully.`,
          request: rechargeRequest,
          updatedUser: { balance: user.balance },
        }),
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store", // Disable caching
          }
        }
      );
    }

    // Handle "Rejected" logic
    return new Response(
      JSON.stringify({
        message: `Recharge request ${status} successfully.`,
        request: rechargeRequest,
      }),
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store", // Disable caching
        }
      }
    );
  } catch (error) {
    console.error("Error processing recharge status:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store", // Disable caching
        }
      }
    );
  }
}
