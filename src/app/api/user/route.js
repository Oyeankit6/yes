import { connect } from "@/dbconfig/db.js";
import User from "@/models/userSchema"; // Ensure this path is correct
import { NextResponse } from "next/server"; // Import NextResponse for API responses
import bcryptjs from "bcryptjs";

// Connect to the database
await connect();

// Helper function to generate the next unique user ID
async function generateUserId() {
  const lastUser = await User.findOne().sort({ userId: -1 }); // Sort by userId in descending order
  let newUserId = 532111; // Start from 532111

  if (lastUser) {
    newUserId = lastUser.userId + 1; // Increment userId by 1 from the last user
  }

  return newUserId;
}

export async function POST(req) {
  const { email, password, mobileNumber } = await req.json();

  // Validate input data
  if (!email || !password || !mobileNumber) {
    return NextResponse.json(
      { message: "Email, password, and mobile number are required" },
      { status: 400 }
    );
  }

  // Check if the email or mobile number already exists
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

  // Hash the password and create the new user
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const userId = await generateUserId();

    const user = new User({
      email,
      mobileNumber,
      password: hashedPassword,
      balance: 0, // Default balance
      userId, // Assign the generated unique userId
    });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully", userId },
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
