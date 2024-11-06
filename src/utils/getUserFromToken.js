import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export const getUserFromtoken = (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedtoken = jwt.verify(token, process.env.AUTH_TOKEN);
    console.log(decodedtoken.id);

    return decodedtoken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
