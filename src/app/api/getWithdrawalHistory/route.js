// src/app/api/getWithdrawalHistory/route.js
import { getUserFromtoken } from "@/utils/getUserFromToken"; // Ensure the correct import path
import { connect } from "@/dbconfig/db";
import Withdrawal from "@/models/WithdrawalData";
import { NextResponse } from "next/server";

// Define the GET handler using NextResponse
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

    // Fetch withdrawal history for the logged-in user
    const withdrawals = await Withdrawal.find({ userId }).sort({ date: -1 });

    return NextResponse.json(withdrawals, { status: 200 });
  } catch (error) {
    console.error("Error fetching withdrawal history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
