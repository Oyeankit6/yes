import { connect } from "@/dbconfig/db";
import { NextResponse } from "next/server";

// Connect to the database
connect();

export async function GET() {
  try {
    // Clear the token by setting an empty token with an expiration in the past
    const response = NextResponse.json(
      { message: "Logout Successfully", success: true },
      { status: 200 }
    );

    // Setting token with an empty value and expiry in the past to delete it
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
      expires: new Date(0), // Expire cookie instantly
      sameSite: "strict", // CSRF protection
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
