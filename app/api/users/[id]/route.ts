import { errorHandler, type CustomError } from "../../handleError";
import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export async function GET(
    req: Request,
    {params} : {params:Promise<{id:string}>}
){
    const userId = (await params).id;
    const session = await getServerSession(authOptions);

    if(!session){
        redirect('/sign-in')
    }
    if(session.user.id !== userId && session.user.role !== 'admin'){
        console.log('Forbidden ! you cannot access to others user !')
        redirect('/error');
    }

    try{
        const user = await prisma.user.findUnique({
            where:{id:userId},
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                image:true,
            }
        })

        return NextResponse.json({user},{status:200})

    }catch(error){
        return errorHandler(error as CustomError)
    }
}

export async function PUT(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){
    const userId = (await params).id;
    const session = await getServerSession(authOptions);

    if(!session){
        redirect('/sign-in')
    }
    if(session.user.id !== userId && session.user.role !== 'admin'){
        console.log('Forbidden ! you cannot access to others user !')
        redirect('/error');
    }

    // Get data from body
    const {role} = await req.json(); 
    console.log('new role:',role)

    try{
        const result = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                role:role
            }
        })

        return NextResponse.json({result},{status:200});


    }catch(error){
        return errorHandler(error as CustomError)
    }

}


export async function DELETE(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){
    const userId = (await params).id;
    const session = await getServerSession(authOptions);

    if(!session){
        redirect('/sign-in')
    }
    if(session.user.id !== userId && session.user.role !== 'admin'){
        console.log('Forbidden ! you cannot access to others user !')
        redirect('/error');
    }

    try{
        const result = await prisma.user.delete({
            where:{
                id:userId
            }
        })

        return NextResponse.json({result},{status:200});


    }catch(error){
        return errorHandler(error as CustomError)
    }

}