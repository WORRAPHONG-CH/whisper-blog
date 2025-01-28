import { NextResponse, NextRequest } from "next/server";
import { errorHandler, type CustomError } from "../../handleError";
import { prisma } from '@/lib/prisma';


export async function GET(){

    try{
        const results = await prisma.category.findMany()
        
        if(!results){
            const error = new Error('Category not found !') as CustomError;
            error.statusCode = 404;
            throw error;
        }
        
        return NextResponse.json({results},{status:200});

    }catch(error){
        return errorHandler(error as CustomError)
    }
}
export async function POST(
    request: NextRequest
){
    try{
        const { name } = await request.json(); // convert to jsObj
        console.log('cat:', name);
        const newCategory = await prisma.category.create({
            data: {
                name
            }
        })
        
        if (!newCategory) {
            const error = new Error('Create category fail !') as CustomError;
            error.statusCode = 400;
            throw error;
        }

        return NextResponse.json({ newCategory }, { status: 201 });

    } catch (error) {
        return errorHandler(error as CustomError)
    }
}