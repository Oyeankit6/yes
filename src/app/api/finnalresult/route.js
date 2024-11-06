import User from "@/models/userSchema";
import { connect } from "@/dbconfig/db";
import Results from "@/models/publicSchema"; // Ensure this schema has results for all categories
import Bet from "@/models/betSchema"; // Import your bet schema
import { getUserFromtoken } from "@/utils/getUserFromToken";

export async function POST(req) {
  try {
    // Connect to the database
    await connect();

    // Parse the incoming request to get the period
    const { period } = await req.json();
    console.log(`Received period: ${period}`);

    // Get the user ID from the token
    const userId = await getUserFromtoken(req);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Find the user by their ID
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const comparingPeriod = period - 1;

    // Filter user's bets for the exact period and ensure they are still pending
    const BetsForPeriod = await Bet.find({
      userId: userId,
      periodNo: comparingPeriod,
      status: "Pending", // Only work with pending bets
    });

    // If no matching bets for the period, return early
    if (BetsForPeriod.length === 0) {
      return new Response(
        JSON.stringify({ message: "No matching pending bets for this period" }),
        { status: 200 }
      );
    }

    // Find the result for the exact period
    const resultForPeriod = await Results.findOne({ period: comparingPeriod });

    if (!resultForPeriod) {
      return new Response(
        JSON.stringify({ message: "No result found for this period" }),
        { status: 404 }
      );
    }

    // Track total winnings to update the balance once
    let totalWinnings = 0;

    // Loop through each bet and update based on the result
    for (let bet of BetsForPeriod) {
      let winnings = 0; // Track individual winnings for each bet

      // Access the result for the specific category of the bet
      const resultForCategory = resultForPeriod.results[bet.category];

      if (!resultForCategory) {
        // If the category's result is not found, skip this bet
        continue;
      }

      // Check for color match
      if (bet.color === resultForCategory.color) {
        winnings = 1.8 * bet.amount;
      } else if (
        bet.color === "violet" &&
        resultForCategory.color.includes("violet")
      ) {
        winnings = 1.8 * bet.amount;
      } else if (
        (bet.color === "red" && resultForCategory.color === "violet-red") ||
        (bet.color === "green" && resultForCategory.color === "green-violet")
      ) {
        winnings = 1.4 * bet.amount;
      } else if (bet.number && bet.number === resultForCategory.number) {
        winnings = 9.5 * bet.amount;
      }

      // If winnings are greater than 0, update the bet and accumulate winnings
      if (winnings > 0) {
        totalWinnings += winnings;
        await Bet.findOneAndUpdate(
          { _id: bet._id },
          {
            $set: {
              result: resultForCategory.color, // Set the result color
              status: "Win",
              amount: winnings,
            },
          }
        );
      } else {
        // If there's no win, set status to "Lose"
        await Bet.findOneAndUpdate(
          { _id: bet._id },
          { $set: { result: resultForCategory.color, status: "Lose" } }
        );
      }
    }

    // Update the user's balance with total winnings only once, after all bets are processed
    if (totalWinnings > 0) {
      foundUser.balance += totalWinnings;
      await foundUser.save(); // Save the updated balance
    }

    // Fetch all bets related to the user to send in the response
    const allUserBets = await Bet.find({ userId: userId });

    return new Response(
      JSON.stringify({
        message: "Bets updated successfully",
        allBets: allUserBets, // Return all bets related to the user
        updatedBalance: foundUser.balance, // Return updated balance
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating bets:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
