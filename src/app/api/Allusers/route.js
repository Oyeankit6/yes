import { connect } from "@/dbconfig/db"; // MongoDB connection logic
import User from "@/models/userSchema"; // User schema

// Handle GET requests
export async function GET(req) {
  try {
    // Connect to the database
    await connect();

    // Fetch all users from the database
    const users = await User.find(
      {},
      { userId: 1, name: 1, mobileNumber: 1, email: 1 }
    ); // Fetch necessary fields

    // Return the list of users as JSON with no caching
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
        "Pragma": "no-cache", // Prevent caching in HTTP 1.0
        "Expires": "0", // Ensure no expiration date
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    // Return an error response
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
