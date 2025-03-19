import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    // ✅ Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }

    console.log("Login Request:", body);
    const { email, password } = body;

    // ✅ Check if email & password are provided
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password", status: 401 },
        { status: 401 }
      );
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // Set JWT_SECRET in .env.local
      { expiresIn: "7d" }
    );

    // ✅ Send response with token
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
        status: 200,
      },
      { status: 200 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevents CSRF attacks
      path: "/", // Cookie accessible on all routes
      maxAge: 7 * 24 * 60 * 60, // Expires in 7 days
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
