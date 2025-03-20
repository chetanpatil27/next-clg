import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req) {
  try {
    await connectDB();

    // Fetch all users from the database
    const users = await User.find({});

    return NextResponse.json({ data: users, status: 200 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
