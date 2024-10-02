import UserModel from "@/app/model/User";
import { errorHandler } from "@/handler/errorHandler";
import { connectDbs } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req: Request, {params}:any) => {
  await connectDbs();

  const { verifyCode } = await req.json();
 
  const { username } = params;
  console.log(username,verifyCode)
  try {
    const userToBeVerified = await UserModel.findOne({
      username,
    });

    if (!userToBeVerified) {
      return errorHandler(false, "User not found", 404);
    } else {
      const currentTime = new Date();

      if(userToBeVerified.verifyCode !== verifyCode){
        return errorHandler(false,"Invalid Code.Please enter the correct otp code",401)
      }
      if (userToBeVerified.verifyCodeExpiry < currentTime) {
        return errorHandler(
          false,
          "Code has expired. Please signUp again",
          404
        );
      } else {
        userToBeVerified.isVerified = true;

        await userToBeVerified.save();
      }
    }

    return NextResponse.json(
      { success: true, message: "User Verified Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(false, "Failed to verify the user", 500);
  }
};
