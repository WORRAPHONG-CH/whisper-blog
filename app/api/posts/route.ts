import {prisma} from '@/lib/prisma';
import { type NextRequest ,NextResponse } from 'next/server';
// import { Post } from '@prisma/client';


export interface CustomError extends Error{
    statusCode?:number
}

const errorHandler = (error:CustomError) =>{
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    NextResponse.json({status:statusCode,error:errorMessage},{status:statusCode});
}

// API GET for get all post from database
export async function GET(
    req : NextRequest
){
    try{
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category') || 'all';
        const search = searchParams.get('search') || ''; // if not search the params has npo value
        const sort =  searchParams.get('sort') || 'desc';
        console.log({category,search,sort});

        // Get data according to filter params
        const whereCondition = category === 'all' ? {
            title:{
                contains: search,
                mode: 'insensitive' as const,
            },
        } : {
            category,
            title:{
                contain:search,
                mode:'insensitive' as const,
            }
        }
        console.log('whereCondition:',whereCondition);

        const results = await prisma.post.findMany({
            where: whereCondition,
            orderBy:{ // orderBy createAt(Date)
                createAt: sort,
            } as {createAt : 'asc' | 'desc'} ,
        }); // prisma.schema.queryMethod
        
        // if results is empthy
        if(!results){
            throw new Error('Data not found')
        }
        // console.log('results:',results);
    

        return Response.json({data:results})
    }catch(error:unknown){
        return errorHandler(error as CustomError);
    }
    
}

// API POST for get title, content
export async function POST(req:Request){
    try{
        const {title,content,category} = await req.json(); // convert request to jsObj
        const newPost = await prisma.post.create({
            data:{
                title,
                content,
                category
            },
        });
        

        return Response.json({
            newPost
        })
        
    }catch(error){
        return errorHandler(error as CustomError);
    }
}