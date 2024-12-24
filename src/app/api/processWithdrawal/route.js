import { connect } from "@/dbconfig/db"; // Utility to connect to the database
import Withdrawal from "@/models/WithdrawalData";
import User from "@/models/userSchema"; // Import the user schema

export async function POST(req) {
  try {
    // Connect to the database
    await connect();

    // Parse request body
    const { loggedinUser, amount, method, paymentDetails } = await req.json();
    const userId = loggedinUser._id;

    // Validate required fields
    if (!userId || !amount || !method || !paymentDetails) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Fetch the logged-in user's details from the database
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Check if the withdrawal amount is less than or equal to the user's balance
    if (amount > user.balance) {
      return new Response(JSON.stringify({ error: "Insufficient balance" }), {
        status: 400,
      });
    }

    // Deduct the amount from the user's balance
    user.balance -= amount;

    // Save the updated user details
    await user.save();

    // Create a new withdrawal record
    const newWithdrawal = new Withdrawal({
      userId,
      amount,
      method,
      paymentDetails,
    });

    // Save the withdrawal to the database
    const savedWithdrawal = await newWithdrawal.save();

    // Send success response
    return new Response(
      JSON.stringify({
        message: "Withdrawal request processed successfully!",
        withdrawal: savedWithdrawal,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process withdrawal. Please try again.",
      }),
      { status: 500 }
    );
  }
}
