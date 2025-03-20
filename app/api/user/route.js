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

export async function PATCH(req) {
  try {
    await connectDB();

    const { userId, name, age, mobile, address, altMobile } = await req.json();

    // Validate the input data
    if (!userId || !name || !age || !mobile || !address || !altMobile) {
      return NextResponse.json(
        { message: "All fields are required", status: 400 },
        { status: 400 }
      );
    }

    console.log(
      "name, age, mobile, address, altMobile",
      name,
      age,
      mobile,
      address,
      altMobile
    );

    // Update the user profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, age, mobile, address, altMobile },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        data: updatedUser,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
