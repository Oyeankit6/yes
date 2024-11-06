import { connect } from "@/dbconfig/db";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Connect to the database
  await connect();

  try {
    // Parse request body
    const { mobileNumber, balance } = await req.json();
    console.log(mobileNumber, balance);

    // Validate request body
    if (!mobileNumber || balance === undefined) {
      return NextResponse.json({
        success: false,
        message: "mobileNumber and balance are required",
      });
    }

    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      { $set: { balance: balance } },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user balance:", error);
    return NextResponse.json({
      success: false,
      message: "Error updating user balance",
    });
  }
}
