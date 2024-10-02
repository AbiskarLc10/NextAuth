import UserModel from "@/app/model/User";
import { errorHandler } from "@/handler/errorHandler";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDbs } from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        await connectDbs();

        try {
          const user = await UserModel.findOne({ email: credentials?.identifier });

     
          if (!user) {
            return errorHandler(
              false,
              "User with this credential does not exist",
              404
            );
          }

          const checkPassword = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );

          if (!checkPassword) {
            throw new Error("Invalid Credentials");
          } else {
            if (!user.isVerified) {
              throw new Error(
                "Please Verify your account. Sign Up again for Verification"
              );
            }
            return user;
          }
        } catch (error) {
          throw new Error("Failed to Sign In the user");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({user,token}) {

        if(user){
            token._id = user._id?.toString(),
            token.email = user.email,
            token.isVerified = user.isVerified,
            token.isAdmin = user.isAdmin
        }

        return token
    },
    async session({token,session}) {
              
        if(token){
            session.user._id = token._id;
            session.user.email = token.email;
            session.user.isVerified = token.isVerified;
            session.user.isAdmin = token.isAdmin;
        }

        return session;
    },
    
  },
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
  
};
