import User from "@/models/userSchema";
import Bet from "@/models/betSchema"; // Import your Bet model
import { getUserFromtoken } from "@/utils/getUserFromToken";
import { connect } from "@/dbconfig/db"; // Ensure you connect to the database

export async function POST(req) {
  try {
    // Connect to the database
    await connect();

    // Parse the request body to extract bet details
    const { betDetails } = await req.json();

    // Get user ID from the token
    const userId = await getUserFromtoken(req);

    // Check if the user ID is valid
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Find the user by ID to check existence and get balance
    const foundUser = await User.findById(userId);

    // Check if the user exists
    if (!foundUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Check if the user has enough balance
    if (foundUser.balance < betDetails.amount) {
      return new Response(JSON.stringify({ error: "Insufficient balance" }), {
        status: 400,
      });
    }

    // Deduct the bet amount from the user's balance
    foundUser.balance -= betDetails.amount;

    // Save the updated user with the new balance
    await foundUser.save();

    // Create a new bet instance
    const newBet = new Bet({
      userId: foundUser._id, // Link bet to user
      number: betDetails.number || "",
      color: betDetails.color,
      amount: betDetails.amount,
      fee: "0.2",
      category: betDetails.category,
      result: betDetails.result,
      periodNo: betDetails.periodNo,
      status: betDetails.status,
    });

    // Save the new bet
    const savedBet = await newBet.save();

    // Return the saved bet details and updated balance as response
    return new Response(
      JSON.stringify({
        message: "Bet placed and balance updated successfully",
        betDetails: savedBet,
        updatedBalance: foundUser.balance,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding bet details:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
