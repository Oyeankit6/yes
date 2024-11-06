import { connect } from "@/dbconfig/db";
import Result from "@/models/publicSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connect(); // Ensure database connection is established

  try {
    const data = await Result.find().sort({ period: -1 }).limit(100); // Fetch only the most recent 100 records

    if (data.length === 0) {
      return NextResponse.json(
        { message: "No records found" },
        { status: 404 }
      );
    }

    const formattedData = data.map((record) => ({
      period: record.period,
      results: {
        Parity: {
          number: record.results.Parity.number,
          color: record.results.Parity.color,
        },
        Sapre: {
          number: record.results.Sapre.number,
          color: record.results.Sapre.color,
        },
        Bcone: {
          number: record.results.Bcone.number,
          color: record.results.Bcone.color,
        },
        Emerd: {
          number: record.results.Emerd.number,
          color: record.results.Emerd.color,
        },
      },
      createdAt: record.createdAt,
    }));

    // Set Cache-Control header to no-store
    return NextResponse.json(formattedData, {
   headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
  },
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { message: "Error fetching records" },
      { status: 500 }
    );
  }
}
