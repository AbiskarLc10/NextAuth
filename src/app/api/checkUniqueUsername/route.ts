import UserModel from "@/app/model/User";
import { errorHandler } from "@/handler/errorHandler";
import { connectDbs } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");

  await connectDbs();

  try {
    const usernameAvailable = await UserModel.findOne({
      username,
    });

    if (usernameAvailable) {
      return errorHandler(false, "Username is not unique", 409);
    }

    return NextResponse.json(
      { success: true, message: "Username is unique" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(false, "Failed to check Username Availability", 500);
  }
};
