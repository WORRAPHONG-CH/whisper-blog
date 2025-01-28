import React from 'react';

import axios,{AxiosError} from 'axios';
import { SearchFilter } from '@/app/components/SearchFilter';
import Reveal from '@/app/components/animation/Reveal';
import TextDrop from '@/app/components/animation/TextDrop';
import CardBlogs from '@/app/components/CardBlogsSection';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Input } from '@/app/components/ui/Input';
// import { Button } from '@/app/components/ui/Button';
// import imgCom from '@/public/assets/jefferson-santos-V9sv7QrDUgc-unsplash.jpg';

interface PostProp{
    id: string,
    title: string,
    content: string,
    image?:string,
    categoryId: number,
    published: true,
    createAt: Date,
    updateAt: Date,
    authorId: string,
    author: {
        name: string,
        email: string,
        image: string,
    },
    category: {
        id: number,
        name:string,
    }
}

interface CategoryProps{
    id:number,
    name:string
}

type Filterprops = {
    filterParams: {[key:string] : string | ''}
  }


  

const fetchPost = async (filterParams:Filterprops['filterParams']): Promise<PostProp[] | null | undefined> =>{
    try{
        const {category, search, sort} = filterParams;
        const query = new URLSearchParams({
            category: category || '0',
            search: search || '',
            sort: sort as string || 'desc',
        }).toString();

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?${query}`);
        
        if(response.statusText !== "OK"){
            throw new Error('Fetch posts fail !');
        }

        return response.data.results;

    }catch(error){
        if(axios.isAxiosError(error)){
            console.log((error as AxiosError).message);
        }else{
            console.log((error as Error).message);
        }
    }
}

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

export default async function BlogPage(
    {searchParams, } : {searchParams:Promise<{[key:string]:string | ''}>}
) {
    const filterParams = await searchParams;
    const [categories,blogs] = await Promise.all([fetchCategory(),fetchPost(filterParams)])

    return (
        <div className="min-h-screen z-10 bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200 py-12 px-6">

            <Reveal>
            <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-10">
                Our Blogs
            </h1>
            </Reveal>
            <TextDrop text='Explore the latest articles, tips, and stories from our talented authors.' classname='text-center text-lg font-medium text-gray-700 mb-12'
            />
            
            <Reveal>
            <div className='w-full flex flex-col gap-4 justify-center  md:flex-row md:justify-between md:gap-2 items-center mb-10 '>
                <SearchFilter categories={categories}/>
                <p className='w-44 text-2xl font-semibold text-purple-500'>{`All Blogs: ${blogs?.length}`}</p>
            </div>
            </Reveal>

            {/* <div className="flex justify-center mb-10">
                <Input
                    type="text"
                    placeholder="Search blogs..."
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    // value={}
                    // onChange={}
                />
            </div> */}

            {/* Card Section */}
            {
                blogs ?
                <CardBlogs blogs={blogs}/>
                :
                <p className='text-md md:text-lg text-center font-semibold text-gray-500'>No blog posts yet!</p>

            }

            
            
        </div>
    );
}
