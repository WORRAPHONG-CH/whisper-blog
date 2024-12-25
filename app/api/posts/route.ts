import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export interface CustomError extends Error{
    statusCode?:number
}

const errorHandler = (error:CustomError) =>{
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    NextResponse.json({status:statusCode,error:errorMessage},{status:statusCode});
}

// API GET for get all post from database
export async function GET(){
    try{
        // Get all data 
        const results = await prisma.post.findMany(); // prisma.schema.queryMethod
        
        // if results is empthy
        if(!results || results.length === 0){
            throw new Error('Data not found')
        }


        return Response.json({data:results})
    }catch(error:unknown){
        return errorHandler(error as CustomError);
    }
    
}

// API POST for get title, content
export async function POST(req:Request){
    try{
        const {title,content} = await req.json(); // convert request to jsObj
        const newPost = await prisma.post.create({
            data:{
                title,
                content
            },
        });
        

        return Response.json({
            newPost
        })
        
    }catch(error){
        return errorHandler(error as CustomError);
    }
}