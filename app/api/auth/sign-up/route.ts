import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { errorHandler, type CustomError } from "../../handleError";
import bcrypt from  'bcryptjs';


export async function POST(
    req: Request,
){
    try {
        const {name,email,password} = await req.json(); // convert req to jsobj
        // console.log(name,email);

        // find if email already exist
        const emailExists = await prisma.user.findUnique({
            where:{
                email
            }
        })

        // if email already exists
        if(emailExists){
            return NextResponse.json({messsage:"Email already exists, Please try another email"},{status:409})
        }

        // hash password 
        const hashedPassword = await bcrypt.hash(password,10);
        // console.log('hashedPassword:',hashedPassword);

        // Add user to database
        const result = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
            }
        })
        // console.log(result);

        return NextResponse.json({data:result},{status:201});

    }catch(error:unknown){
        return errorHandler(error as CustomError);
    }
}