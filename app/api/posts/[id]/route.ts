import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { errorHandler, type CustomError } from '../../handleError';




// API GET to get post according to id
export async function GET(
    req: Request, // get request type as Request
    { params }: { params: Promise<{ id: string }>}, // get params type as string
)
{
    
    try{
        const postId = (await params).id;
        // const {postId} = req.query; // Get the id from the query parameters
        // Find data with param id
        const result = await prisma.post.findUnique({
            where:{ id : postId },
            include:{
                author:{
                    select:{
                        name:true,
                        image:true,
                        email:true,
                    },
                },
                category:true
            }
        })
        
        // If not found 
        if(!result){
            const error = new Error('The data not found') as CustomError;
            error.statusCode = 400;
            throw error;
        }
        

        return NextResponse.json({post:result},{status:200});


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
        const editId = (await params).id;
        // console.log(editId);

        // Get update data from req.body
        const {title,content, category, published, image} = await req.json();
        // console.log(title,content, category, published);

        // Update data
        const updatePost = await prisma.post.update({
            where:{id:editId},
            data:{
                title,
                content,
                category,
                published,
                image
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
        const deleteId = (await params).id;

        // Delete post in database 
        const deletePost = await prisma.post.delete({
            where:{id:deleteId}
        })

        return Response.json({deletePost})
        
        
    }catch(error){
        return errorHandler(error as CustomError);
    }

}