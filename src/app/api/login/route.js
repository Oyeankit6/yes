import { connect } from "@/dbconfig/db.js";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database
await connect();

export async function POST(req) {
  try {
    const { mobileNumber, password } = await req.json();

    // Check if the user exists by mobile number
    let user = await User.findOne({ mobileNumber });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid mobile number or user does not exist" },
        { status: 400 }
      );
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    // Token data to be signed
    const tokenData = {
      id: user._id,
      mobileNumber: user.mobileNumber,
    };

    // Generate JWT token
    const token = jwt.sign(tokenData, process.env.AUTH_TOKEN, {
      expiresIn: "1d", // Token valid for 1 day
    });

    // Create response and set token as httpOnly cookie
    const response = NextResponse.json(
      { message: "User logged in successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only in HTTPS for production
      maxAge: 24 * 60 * 60, // 1 day
      sameSite: "strict", // CSRF protection
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
