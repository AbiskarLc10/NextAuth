import { getToken } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export  async function  middleware(request: NextRequest){

    const token = await getToken({req: request});
    const url = request.nextUrl;

    if(token &&( url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up") || url.pathname.startsWith("/verifyCode") )){

        return NextResponse.redirect(new URL("/dashboard",request.url))
    }
    
    if(!token && url.pathname.startsWith("/dashboard")){

        return NextResponse.redirect(new URL("/sign-up",request.url))
    }
} 
export const config = {
    matcher: ['/sign-in',
      '/sign-up',
      "/",
      '/dashboard/:path*',
      '/verifyCode/:path*'
    ]
  }