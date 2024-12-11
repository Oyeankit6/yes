import { connect } from "@/dbconfig/db.js"; // Database connection utility
import Recharge from "@/models/rechargeSchema.js"; // Recharge model
import mongoose from "mongoose"; // Import mongoose to use ObjectId

// POST request handler
export async function POST(req) {
  try {
    const { userId, amount, utrNumber } = await req.json(); // Extract data from the body

    // Validate required fields
    if (!userId || !amount || !utrNumber) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 }
      );
    }

    // Validate that userId is a valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(
        JSON.stringify({ message: "Invalid userId format." }),
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connect();

    // Create a new recharge record
    const newRecharge = new Recharge({
      userId: userId, // Ensure userId is in correct format
      amount,
      utrNumber,
      status: "Pending", // Initially set status as "Pending"
    });

    // Save the new recharge record
    await newRecharge.save();

    return new Response(
      JSON.stringify({
        message: "Recharge request submitted successfully.",
        recharge: newRecharge,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing the recharge:", error);
    return new Response(
      JSON.stringify({
        message: "Error processing the recharge",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
