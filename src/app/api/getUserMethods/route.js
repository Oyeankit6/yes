import { NextResponse } from "next/server"; // Import NextResponse
import { getUserFromtoken } from "@/utils/getUserFromToken"; // Named import
import User from "@/models/userSchema"; // Your User model
import PaymentDetail from "@/models/BankCards"; // Payment details model
import { connect } from "@/dbconfig/db"; // Utility to connect to your DB

// Named export for GET method
export async function GET(req) {
  try {
    await connect(); // Connect to DB

    // Step 1: Get userId from token
    const userId = getUserFromtoken(req); // Extract userId using the named import
    console.log("User ID from token:", userId);

    // Step 2: Fetch user from the database (User model for bankDetails & upiDetails)
    const user = await User.findById(userId).select("bankDetails upiDetails");

    // Step 3: Handle user not found
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 4: Fetch payment details from the PaymentDetail model (Bank Cards)
    const bankDetails = await PaymentDetail.find({ userId });

    // Assuming `userId` is the field in PaymentDetail

    // Step 5: Return all data
    return NextResponse.json({
      bankDetails: bankDetails, // Include bank card details if available
    });
  } catch (error) {
    console.error("Error fetching user methods:", error.message);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 } // Unauthorized if there's an issue with token verification
    );
  }
}
