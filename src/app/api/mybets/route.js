import Bet from "@/models/betSchema";
import { connect } from "@/dbconfig/db";
import { getUserFromtoken } from "@/utils/getUserFromToken";

export async function GET(req) {
  try {
    // Connect to the database
    await connect();

    // Get user from the token
    const userId = await getUserFromtoken(req);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Find all bets for the user
    const userBets = await Bet.find({ userId });

    if (!userBets || userBets.length === 0) {
      return new Response(JSON.stringify({ message: "No bets found" }), {
        status: 404,
      });
    }

    // Return all bets for the user
    return new Response(
      JSON.stringify({
        message: "Bets retrieved successfully",
        bets: userBets,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving bets:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
