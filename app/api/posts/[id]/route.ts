import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// initialize prisma client
const prisma = new PrismaClient();

interface CustomError extends Error{
    statusCode?: number
}

// Error Handling
export const errorHandler = (error:CustomError) =>{
    const statusCode = error.statusCode || 500
    const messageError = error.message || "Internal server error"
    console.log("ERROR:",messageError);
    return NextResponse.json({status: statusCode,error:messageError},{status:statusCode});
}

// API GET to get post according to id
export async function GET(
    req: Request, // get request type as Request
    { params }: { params: Promise<{ id: string }>}, // get params type as string
)
{
    
    try{
        const postId = Number((await params).id);
        // const {postId} = req.query; // Get the id from the query parameters
        // Find data with param id
        const result = await prisma.post.findUnique({
            where:{ id : Number(postId) },
        })
        
        // If not found 
        if(!result){
            const error = new Error('The data not found') as CustomError;
            error.statusCode = 400;
            throw error;
        }

        return NextResponse.json({data:result});


    }catch(error){       
        return errorHandler(error as CustomError);
        
    }
}

// PUT API for edit/update post
export async function PUT(
    req: Request,
    {params}: {params: Promise<{id:string}>},
){
    
    try{
        // Get editId from url params
        const editId = Number((await params).id);
        console.log(editId);

        // Get update data from req.body
        const {title,content} = await req.json();
        console.log(title,content);

        // Update data
        const updatePost = await prisma.post.update({
            where:{id:editId},
            data:{
                title,
                content
            }
        })

        return Response.json({updatePost})


    }catch(error){
        return errorHandler(error as CustomError);
    }
}

// DELETE API for delete post
export async function DELETE(
    req: Request,
    {params}: {params:Promise<{id:string}>},
){
    try{
        // Get delete ID from params url
        const deleteId = Number((await params).id);

        // Delete post in database 
        const deletePost = await prisma.post.delete({
            where:{id:deleteId}
        })

        return Response.json({deletePost})
        
        
    }catch(error){
        return errorHandler(error as CustomError);
    }

}