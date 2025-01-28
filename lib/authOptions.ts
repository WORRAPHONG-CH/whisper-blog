import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
// import { getCsrfToken } from "next-auth/react";


export const authOptions:NextAuthOptions = {
    
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn:'/sign-in'
    }
    ,
    providers: [
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email:{label:'Email',type:'email', placeholder:'Your@example.com'},
                password:{label:'Password', type:'password', placeholder:'your password'}
            },
            async authorize(credentials){
                try {
                    // const csrfToken = req?.body?.csrfToken;
                    // if(!csrfToken || csrfToken !== (await getCsrfToken({req}))){
                    //     throw new Error('Invalid CSRF Token !')
                    // }

                    if (!credentials?.email || !credentials?.password) {
                      throw new Error('Email and password are required!');
                    }
                
                    const existsUser = await prisma.user.findUnique({
                      where: { email: credentials.email },
                    });
                
                    if (!existsUser) {
                      throw new Error('Email not found, please sign up!');
                    }
                
                    if (!existsUser.password) {
                      throw new Error('Password is required!');
                    }
                
                    const matchPassword = await bcrypt.compare(credentials.password, existsUser.password);
                
                    if (!matchPassword) {
                      throw new Error('Invalid password!');
                    }
                
                    return {
                      id: existsUser.id,
                      name: existsUser.name || '',
                      email: existsUser.email,
                      role: existsUser.role,
                    };
                  } catch (error) {
                    console.error('Authorize Error:', error);
                    throw new Error('Authentication failed!');
                  }
                
        
            }
            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '' ,
            profile(profile){
                // console.log('profile:',profile);
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: 'member',
                }
            }
        })
    ],
    // After finish authenication(authorize)
    callbacks:{
        // jwt get user from authorize function
        jwt: async ({ token, user, profile }) => {
            if (user || profile) {
                token.id = user.id;
                token.role = user.role;
                // console.log('token auth:',token);
            }
            
            return token;
        },
        session: async ({ session, token, user}) => {
            if ( token || user ) {
                session.user.id = token.id;
                session.user.role = token.role;
                // console.log('session auth:',token);
            }
            return session;
        },
        // redirect: async ({ url, baseUrl }) => {
        //     // After successful login, redirect to the user's profile page using the user's ID
        //     if (url === baseUrl + '/api/auth/callback/credentials') {
        //         return `${baseUrl}/user/${url.split('/').pop()}/profile`; // Redirect to /user/[id]/profile
        //     }
        //     return url;
        // }
    
    }
}