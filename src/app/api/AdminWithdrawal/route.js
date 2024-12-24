// src/app/api/withdrawal/route.js
import { connect } from "@/dbconfig/db";
import Withdrawal from "@/models/WithdrawalData"; // Your Withdrawal model
import User from "@/models/userSchema"; // Assuming you have a User model
import { NextResponse } from "next/server";

// GET: Fetch all withdrawal requests with user details
export async function GET() {
  try {
    await connect();

    // Fetch all withdrawal requests and populate the user details based on userId
    const withdrawals = await Withdrawal.find()
      .sort({ dateRequested: -1 })
      .populate("userId", "userId  email");

    // Populating user details (name, email)

    return NextResponse.json(withdrawals); // Send withdrawal requests with user details
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH: Update withdrawal request status
export async function PATCH(request) {
  const { id, status } = await request.json(); // Get request body
  try {
    if (!id || !status) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    await connect();

    // Update withdrawal request status
    const updatedRequest = await Withdrawal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { message: "Withdrawal request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRequest); // Return the updated withdrawal request without user details
  } catch (error) {
    console.error("Error updating withdrawal request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
