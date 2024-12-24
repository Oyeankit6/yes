import { connect } from "@/dbconfig/db";
import Recharge from "@/models/rechargeSchema";
import User from "@/models/userSchema";

import { getUserFromtoken } from "@/utils/getUserFromToken"; // Ensure the correct import path
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract user ID from the token
    const userId = getUserFromtoken(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Authorization token is invalid or expired" },
        { status: 401 }
      );
    }

    // Connect to the database
    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validId = user.userId;

    // Fetch recharge history for the logged-in user
    const transactions = await Recharge.find({ userId: validId })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .lean(); // Return plain JavaScript objects for better performance

    // Respond with the transactions
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching recharge history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
