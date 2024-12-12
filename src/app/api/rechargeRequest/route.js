import { connect } from "@/dbconfig/db.js";
import Recharge from "@/models/rechargeSchema.js";
import User from "@/models/userSchema.js";

export async function POST(req) {
  try {
    await connect();

    const { id, amount, status } = await req.json();
    if (!id || !amount || !status) {
      return new Response(
        JSON.stringify({ message: "Invalid input parameters" }),
        { status: 400 }
      );
    }

    // Update the recharge request status
    const rechargeRequest = await Recharge.findOneAndUpdate(
      { userId: id },
      { status },
      { new: true }
    );

    if (!rechargeRequest) {
      return new Response(
        JSON.stringify({ message: "Recharge request not found" }),
        { status: 404 }
      );
    }

    // Update the user's balance if approved
    let updatedUser = null;
    if (status === "Approved") {
      updatedUser = await User.findOneAndUpdate(
        { userId: id },
        { $inc: { balance: amount } },
        { new: true }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Recharge request ${status} successfully.`,
        updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating recharge status:", error);
    return new Response(
      JSON.stringify({ message: "Error updating recharge status" }),
      { status: 500 }
    );
  }
}
