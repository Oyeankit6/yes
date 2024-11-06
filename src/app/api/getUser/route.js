import { connect } from "@/dbconfig/db";
import User from "@/models/userSchema";
import { getUserFromtoken } from "@/utils/getUserFromToken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Establish the database connection
    await connect();

    // Get the user ID from the token (assuming the token is in the headers or cookies)
    const id = await getUserFromtoken(req);

    if (!id) {
      return NextResponse.json(
        { error: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    // Fetch the user by the id from the database
    const user = await User.findOne({ _id: id });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Respond with the user data
    return NextResponse.json({ data: user, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
