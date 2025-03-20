import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", status: 400 },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: user, status: 200 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
