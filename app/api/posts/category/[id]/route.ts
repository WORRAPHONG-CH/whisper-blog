import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { errorHandler, type CustomError } from '../../../handleError';




// API GET to get category according to id
export async function GET(
    req: Request, // get request type as Request
    { params }: { params: Promise<{ id: string }>}, // get params type as string
)
{
    
    try{
        const categoryId = Number((await params).id);
        
        const result = await prisma.category.findUnique({
            where:{ id : categoryId},
            }
        )
        
        // If not found 
        if(!result){
            const error = new Error('The data not found') as CustomError;
            error.statusCode = 400;
            throw error;
        }
        

        return NextResponse.json({category:result},{status:200});


    }catch(error){       
        return errorHandler(error as CustomError);
        
    }
}

// PUT API for edit/update category
export async function PUT(
    req: Request,
    {params}: {params: Promise<{id:string}>},
){
    
    try{
        // Get editId from url params
        const editId = Number((await params).id);
        // console.log(editId);

        // Get update data from req.body
        const {name} = await req.json();
        // console.log(title,content, category, published);

        // Update data
        const updateCategory = await prisma.category.update({
            where:{id:editId},
            data:{
                name
            }
                
            
        })

        return Response.json({updateCategory})


    }catch(error){
        return errorHandler(error as CustomError);
    }
}

// DELETE API for delete category
export async function DELETE(
    req: Request,
    {params}: {params:Promise<{id:string}>},
){
    try{
        // Get delete ID from params url
        const deleteId = Number((await params).id);

        // Delete post in database 
        const deleteCategory = await prisma.category.delete({
            where:{id:deleteId}
        })

        return Response.json({deleteCategory})
        
        
    }catch(error){
        return errorHandler(error as CustomError);
    }

}