import { errorHandler, type CustomError } from "../../handleError";
import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'


export async function GET(
    req: Request,
    {params} : {params:Promise<{id:string}>}
){
    
    const userId = (await params).id;
    
    try{
        const posts = await prisma.post.findMany({
            where:{
                authorId:userId
            },
            include:{
                category:true
            },
            orderBy:{
                updateAt:'desc'
            }
            
        })
        
        if(!posts){
            throw new Error('Data not found');
        }
        
        return NextResponse.json({posts},{status:200})

    }catch(error){
        return errorHandler(error as CustomError)
    }
}

