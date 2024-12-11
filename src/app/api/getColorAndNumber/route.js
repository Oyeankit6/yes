import { connect } from "@/dbconfig/db";
import Result from "@/models/publicSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connect(); // Ensure database connection

  try {
    // Pagination support
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = (page - 1) * limit;

    // Fetch and format data
    const data = await Result.find()
      .sort({ period: -1 })
      .skip(skip)
      .limit(limit);

    const formattedData = data.map((record) => ({
      period: record.period,
      results: {
        Parity: {
          number: record.results?.Parity?.number || null,
          color: record.results?.Parity?.color || null,
        },
        Sapre: {
          number: record.results?.Sapre?.number || null,
          color: record.results?.Sapre?.color || null,
        },
        Bcone: {
          number: record.results?.Bcone?.number || null,
          color: record.results?.Bcone?.color || null,
        },
        Emerd: {
          number: record.results?.Emerd?.number || null,
          color: record.results?.Emerd?.color || null,
        },
      },
      createdAt: record.createdAt,
    }));

    // Return the response
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching records:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Error fetching records" },
      { status: 500 }
    );
  }
}
