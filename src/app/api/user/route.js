import { connect } from "@/dbconfig/db.js";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Connect to the database
await connect();

export async function POST(req) {
  // Parse request body
  const { email, password, mobileNumber } = await req.json();

  // Check if both email and mobile number are provided
  if (!email || !password || !mobileNumber) {
    return NextResponse.json(
      { message: "Email, password, and mobile number are required" },
      { status: 400 }
    );
  }

  // Check if user already exists by email or mobile number
  const existingEmailUser = await User.findOne({ email });
  const existingMobileUser = await User.findOne({ mobileNumber });

  if (existingEmailUser) {
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 400 }
    );
  }

  if (existingMobileUser) {
    return NextResponse.json(
      { message: "Mobile number already in use" },
      { status: 400 }
    );
  }

  // Hash the password using bcryptjs
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save the new user
    const user = new User({
      email,
      mobileNumber,
      password: hashedPassword,
      balance: 0, // Default balance
    });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while registering user:", error);
    return NextResponse.json(
      { message: "Something went wrong, please try again later" },
      { status: 500 }
    );
  }
}
