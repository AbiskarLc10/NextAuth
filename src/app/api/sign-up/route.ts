import UserModel from "@/app/model/User";
import { errorHandler } from "@/handler/errorHandler";
import { connectDbs } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendVerficationEmail } from "@/helpers/sendEmail";

export const POST = async (request: Request) => {
  const { username, email, password, phone } = await request.json();

  await connectDbs();

  try {
    const userExist = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (userExist) {
      return errorHandler(false, "User with this already exists", 401);
    }

    const emailExist = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (emailExist) {
      if (emailExist.isVerified) {
        return errorHandler(
          false,
          "User is already verified with this email",
          400
        );
      } else {
        const hashPassword = await bcrypt.hash(password, 10);

        emailExist.password = hashPassword;
        emailExist.verifyCode = verifyCode;
        emailExist.verifyCodeExpiry = new Date(Date.now() + 3600000);

        emailExist.save();
      }
    }else{
        const hashPassword = await bcrypt.hash(password, 10);
       
          const codeExpirationTime = new Date(Date.now() + 3600000)

          const newUser = new UserModel({
            username,
            email,
            password:hashPassword,
            phone,
            verifyCode,
            verifyCodeExpiry: codeExpirationTime,
          })
        
          await newUser.save();
    }

      
    const emailResponse = await sendVerficationEmail(email,username,verifyCode)

    if(!emailResponse.success){
      return errorHandler(false,"Failed to send Verification Email to user",500);
    }

    return NextResponse.json({success: emailResponse.success, message: emailResponse.message},{status: 200})
    
  } catch (error) {
    return errorHandler(false, "Failed to register User", 500);
  }

};
