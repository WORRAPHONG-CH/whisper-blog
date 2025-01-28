import { NextResponse } from "next/server";
import { errorHandler, type CustomError } from "../handleError";
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export async function GET() {
    try {
        // Get Token 
        const session = await getServerSession(authOptions)

        if(!session){
            return redirect('/sign-in');
        }
        if(session.user.role !== 'admin'){
            return redirect('/error')
        }
        // console.log('session api:', session);

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                    }
                }
            },
        });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return errorHandler(error as CustomError);
    }
}