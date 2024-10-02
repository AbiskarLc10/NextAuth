import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/emailTemplate";


export const  sendVerficationEmail=async (
    email:string,
    username: string,
    verifyCode: string

): Promise<ApiResponse> =>{
         
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Abiskar Web App verification Email',
            react: VerificationEmail({username, otp:verifyCode})
          });
        return {success:true, message:"Verification Email sent successfully"}
    } catch (emailError) {
        
        console.error("Error sending verification email", emailError)
        return { success:false , message: "failed to send verification email"}
    }
}
