import { NextResponse } from "next/server";
import { errorHandler, type CustomError } from "../handleError";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(
){
    try{
        const session = await getServerSession(authOptions);

        if(!session){
            const error = new Error('Unauthorize !') as CustomError;
            error.statusCode = 403 ;
            throw error
        }
        // console.log('api auth session:',session)

        return NextResponse.json({message:'Login !',session},{status:200})

    }catch(error){

        return errorHandler(error as CustomError)
    }
}