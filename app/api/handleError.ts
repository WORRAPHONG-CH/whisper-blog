import { NextResponse } from "next/server";


export interface CustomError extends Error{
    statusCode?:number
}

export const errorHandler = (error:CustomError) =>{
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    console.log(statusCode,':',errorMessage);   
    NextResponse.json({status:statusCode,error:errorMessage},{status:statusCode});
}