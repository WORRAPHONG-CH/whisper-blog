import {prisma} from '@/lib/prisma';
import { NextRequest ,NextResponse } from 'next/server';
import { errorHandler, type CustomError } from '../handleError';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// import { Post } from '@prisma/client';


// API GET for get all post from database
export async function GET(
    req : NextRequest
){
    try{
        const searchParams = req.nextUrl.searchParams;
        const categoryId = Number(searchParams.get('category') || '0');
        const search = searchParams.get('search') || ''; // if not search the params has npo value
        const sort =  searchParams.get('sort') || 'desc';
        console.log({categoryId,search,sort});

        // Get data according to filter params
        const whereCondition = categoryId === 0 ? {
            title:{
                contains: search,
                mode: 'insensitive' as const,
            },
        } : {
            categoryId: {
                equals: categoryId,
            },
            title:{
                contains: search,
                mode: 'insensitive' as const,
            }
        }
        console.log('whereCondition:',whereCondition);

        const results = await prisma.post.findMany({
            where: whereCondition,
            orderBy:{ // orderBy createAt(Date)
                createAt: sort,
            } as {createAt : 'asc' | 'desc'} ,
            include:{
                author: {
                    select:{
                        name:true,
                        email:true,
                        image:true,
                    }
                },
                category:true
            },
            
        }); // prisma.schema.queryMethod
        
        // if results is empthy
        if(!results){
            throw new Error('Data not found')
        }
        // console.log('results:',results);
    

        return NextResponse.json({results}, {status:200})
    }catch(error:unknown){
        return errorHandler(error as CustomError);
    }
    
}

// API POST for get title, content
export async function POST(req:NextRequest){
    try{
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            throw new Error('Session not found, please login');
        }

        const {title,content,categoryId,published,image} = await req.json(); // convert request to jsObj
        if (!categoryId) {
            throw new Error('Category ID is missing');
        }
        console.log('category:',categoryId, typeof(categoryId))
        const newPost = await prisma.post.create({
            data:{
                title,
                content,
                categoryId:Number(categoryId),
                published,
                authorId : String(session.user.id),
                image: image|| null
            },
        });
        
        return NextResponse.json({newPost} ,{status:201})
        
    }catch(error){
        return errorHandler(error as CustomError);
    }
}