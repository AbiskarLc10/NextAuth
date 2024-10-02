import { NextResponse } from "next/server";



export const errorHandler = async (success:boolean,message:string,code: number) =>{

    const statusCode = code || 500;
    const errorMessage = message || "Something went wrong";
    return NextResponse.json({message: errorMessage, success},{status: statusCode})
}