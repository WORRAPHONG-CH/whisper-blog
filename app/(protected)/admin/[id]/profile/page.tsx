import React from 'react';
import { Button } from '@/app/components/ui/Button';
import {  PlusCircle, Mail, User, Users, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import axios,{AxiosError} from 'axios';
import { Category} from '@prisma/client';
import { CardPosts } from '@/app/components/CardPostsProfile';
import UserManagement from '@/app/components/admin/UserManagement';
import CardCategory from '@/app/components/admin/CardCategory';
import Reveal from '@/app/components/animation/Reveal';
// import { cookies } from 'next/headers';
// import supabase from '@/utills/supabase/client';

interface PostProps{
    id:string,
    title:string,
    content:string,
    category:Category,
    updateAt:Date,
    image?:string
}

// interface Userprops{
//     id:string,
//     name:string,
//     email:string,
//     role:string,
//     image:string,
//     posts?:{
//         id:string,
//         image:string,
//         title:string
//     }[]
// }

interface CategoryProps{
    id:number,
    name:string
}

const fetchPosts = async(adminId:string):Promise<PostProps[]> =>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user-posts/${adminId}`,
            {
                headers:{'Cache-Control':'no-store'}
        });

        if(response.statusText !== 'OK'){
            throw new Error('Failed to fetch posts');
        }
        return response.data.posts;

        

    }catch(error){
        if (axios.isAxiosError(error)) {
            console.error(error.message);
            throw (error as AxiosError).message;
        } else {
            console.error((error as Error).message);
            throw (error as Error).message;
        }

}
}

// const fetchUsers = async (): Promise<Userprops[]> => {
//     try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/session/users`, {
//             withCredentials: true // Ensures cookies are sent with the request
//         });

//         if (response.statusText !== 'OK') {
//             throw new Error('Failed to fetch users');
//         }

//         return response.data.users;

//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error(error.message);
//             throw (error as AxiosError).message;
//         } else {
//             console.error((error as Error).message);
//             throw (error as Error).message;
//         }
//     }
// };

const fetchCategory = async ():Promise<CategoryProps[]> =>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/category`,{
            headers:{
                'Cache-Control':'no-store'
            }
        });

        if(response.statusText !== "OK"){
            throw new Error('Fail to fetch category !');
        }

        return response.data.results;

    

    }catch(error){
        if (axios.isAxiosError(error)) {
            console.error(error.message);
            throw (error as AxiosError).message;
        } else {
            console.error((error as Error).message);
            throw (error as Error).message;
        }
    }
}


export default async function AdminProfilePage(){  

    const session = await getServerSession(authOptions);
    // console.log('admin session:',session)
    if(!session || !session.user){
        console.log('No session found');
        redirect('/sign-in');
    }
    if(session.user.role !== 'admin'){
        console.log('Forbidden, You cannot access this page !');
        redirect('/');
    }
    // const cookieStore = cookies();
    // const cookieHeader = (await cookieStore).get('next-auth.session-token')?.value || '';

    // console.log('session:',session)
    const [posts,categories] = await Promise.all([fetchPosts(session?.user.id),fetchCategory()])
    
    // console.log('posts:',posts)
    // console.log('catefory:',categories);
    // console.log('users:', users)


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 px-4 py-10">
            <div className="w-11/12 md:w-9/12 lg:w-6/12 h-full mx-auto flex flex-col gap-5 bg-white p-6 border-4 border-purple-400 rounded-2xl shadow-2xl">
                {/* Admin profile Section */}
                <Reveal>
                <h1 className='text-2xl font-bold text-center md:text-start '>Your Profile</h1>
                </Reveal>

                <Reveal>
                <div className="flex flex-col gap-5  md:flex-row items-center md:gap-5  rounded-lg shadow-lg py-5 px-4">
                    
                    <div className='w-full  md:w-1/4 flex justify-center'>
                        {session?.user.image ?
                        <Image
                            src={session?.user.image}
                            alt="Admin Avatar"
                            height={500}
                            width={500}
                            priority={true}
                            style={{ objectFit: 'cover' }}
                            className="w-24 h-24 rounded-full"
                        />:
                        <UserCircle size={30} color='purple' />
                    
                        }
                    </div>
                    
                    <div className=" mx-auto md:w-3/4 text-sm md:text-lg flex flex-col gap-3 ">
                        <div className="flex items-center gap-4  text-gray-800">
                            <User  className="text-purple-500" />
                            <p>{session?.user.name}</p>
                        </div>
                        <div className="flex items-center gap-4  text-gray-800">
                            <Mail className="text-blue-500" />
                            <p>{session?.user.email}</p>
                        </div>
                        <div className="flex items-center gap-4 text-gray-800">
                            <Users className="text-green-500" />
                            <p>{session?.user.role}</p>
                        </div>
                    </div>
                    
                </div>
                </Reveal>

            {/* Admin Posts Section */}
            <div className="w-full mx-auto ">
                <div className='flex items-center justify-between'>  
                    <Reveal>
                    <h3 className="text-2xl font-bold mb-4">Your Posts </h3>
                    </Reveal> 
                    <Reveal>
                    <Link href={`/user/${session?.user.id}/post/create-post`}>
                        <Button variant="default" className="flex items-center gap-1 text-sm text-purple-500 ">
                            <PlusCircle size={20} />
                            Add Post
                        </Button>
                    </Link>
                    </Reveal>
                </div>
                
                <div className="w-full space-y-4 overflow-y-auto max-h-[20rem]">
                    
                    {posts.length >0 ? 
                        posts.map((post,index) => (
                            <CardPosts
                                key={index}
                                userId={session?.user.id}
                                postId={post.id}
                                title={post.title}
                                content={post.content}
                                categoryName={post.category.name}
                                updateAt={post.updateAt}
                                imageUrl={post.image}
                            />
                        )) :
                        <p className="text-gray-600 text-center">No blog posts yet!</p>
                    }

                </div>
            </div>

            {/* Category Management Section */}
            <div className="max-w-5xl w-full h-64 mx-auto ">
                <h3 className="text-2xl font-bold mb-4">Manage Categories</h3>
                <CardCategory categories={categories}/>
                
            </div>

            {/* User Management Section */}
            <UserManagement />
            
        </div>
    </div>
    );
};

