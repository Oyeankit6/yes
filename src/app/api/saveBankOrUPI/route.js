import { connect } from "@/dbconfig/db";
import PaymentDetail from "@/models/BankCards";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const {
      userId,
      type,
      name,
      ifsc,
      bankName,
      accountNumber,
      mobileNumber,
      email,
      upiId,
    } = await req.json();

    // Validate common required fields
    if (!userId || !type) {
      return NextResponse.json(
        { message: "User ID and payment type are required." },
        { status: 400 }
      );
    }

    if (type === "bank") {
      // Validate required fields for bank details
      if (
        !name ||
        !ifsc ||
        !bankName ||
        !accountNumber ||
        !mobileNumber ||
        !email
      ) {
        return NextResponse.json(
          { message: "All bank details are required." },
          { status: 400 }
        );
      }
    } else if (type === "upi") {
      // Validate required fields for UPI
      if (!upiId) {
        return NextResponse.json(
          { message: "UPI ID is required." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Invalid payment type. Must be 'bank' or 'upi'." },
        { status: 400 }
      );
    }

    // Prepare the data object
    const paymentData =
      type === "bank"
        ? {
            userId,
            type,
            bankDetails: {
              name,
              ifsc,
              bankName,
              accountNumber,
              mobileNumber,
              email,
            },
          }
        : {
            userId,
            type,
            upiDetails: {
              upiId,
            },
          };

    // Save the data to the database
    const newPaymentDetail = new PaymentDetail(paymentData);
    await newPaymentDetail.save();

    return NextResponse.json(
      {
        message: "Payment details saved successfully.",
        paymentDetail: newPaymentDetail,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving payment details:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
