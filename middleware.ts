import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { errorHandler, type CustomError } from "./app/api/handleError";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./lib/authOptions";


export async function middleware(
    req: NextRequest
){
    console.log('========== Middleware ==========')
    try{

        // const session = await getServerSession(authOptions);
        const userToken = await getToken({
            req:req,
            secret:process.env.NEXTAUTH_SECRET,
            secureCookie: process.env.NODE_ENV === "production",
        });

        // console.log('Cookies:', req.cookies.getAll());

        // Get the pathname of request
        
        const {pathname}  = new URL(req.url);
        console.log('pathname:',pathname);
        console.log('pathname split:',pathname.split('/'));
        console.log('JWT Token:',userToken);
        

        if(!userToken){
            console.log('You need to sign in first !');
            return NextResponse.redirect(new URL('/sign-in',req.url));
        }
        
        
    
        if(pathname.startsWith('/user') && userToken?.role !== 'member' && userToken?.role !== 'admin'){
            console.log(`You're not in the role !`)
            return NextResponse.redirect(new URL('/sign-in',req.url));
        }
        if(pathname.startsWith('/admin') && userToken?.role !== 'admin'){
            console.log(`Forbidden, access denied !`)
            return NextResponse.redirect(new URL('/error',req.url));
        }
        
        if(pathname === '/api/users' && userToken?.role !== 'admin'){
            console.log(`Forbidden, access denied !`)
            return NextResponse.redirect(new URL('/error',req.url));
        }

        // if(pathname === `/api/users/${userToken.id}`){
        //     console.log(`Forbidden, access denied !`)
        //     return NextResponse.redirect(new URL('/error',req.url));
        // }
        
    
        return NextResponse.next(); // continue the request if the condition match

    }catch(error){
        return errorHandler(error as CustomError);
    }
}

export const config = {
    matcher: ['/user/:path*', '/admin/:path*', '/api/users/:path*'],
}

