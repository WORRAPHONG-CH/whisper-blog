// 'use client'
import { Button } from "@/app/components/ui/Button";
import PostTable from "@/app/components/PostTable";
import Link from "next/link";
import { Suspense } from "react";
import { SearchFilter } from "@/app/components/SearchFilter";
import {Post} from '@prisma/client';
import axios,{AxiosError} from 'axios';

// import dynamic from "next/dynamic";

// const PostTable = dynamic(()=> import('./components/PostTable'),{
//   ssr: true,
// });

type Filterprops = {
  filterParams: {[key:string] : string | ''}
}

const fetchPosts = async (filterParams:Filterprops['filterParams']):Promise<Post[]> =>{
    try{
        // object destructuring from filterparams
        const {category, search, sort} = filterParams;
        const query = new URLSearchParams({
            category: category || 'all',
            search: search || '',
            sort: sort as string || 'desc',
        }).toString();

        // fetch data from api 
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?${query}`,{
            headers:{
                "Cache-Control":'no-store', // Ensure data is always fresh
            } 
        });

        // if response is success

        return response.data.data; 
        
    }catch(error:unknown){
        const errMessage = error as AxiosError;
        console.log(errMessage.message);
        throw errMessage;
    }
}

export default async function ManagePosts(
  {searchParams, } : {searchParams:Promise<{[key:string]:string | ''}>}
) {
  const filterParams = await searchParams;

  const posts = await fetchPosts(filterParams);
  
  return (
    <div className="bg-white min-h-screen min-w-full py-10 px-10 flex flex-col gap-5 ">
      <h2 className="text-black font-bold text-2xl">Blog Posts</h2>

      <div className="w-3/4 self-center">
        <SearchFilter/>
      </div>
      

      <main className="w-3/4 self-center">
        <Suspense fallback={
          <p className="text-md w-full self-center "> Loading Data... </p>}>
          <PostTable posts={posts}/>
        </Suspense>

        <Link href='/create-post'>
          <Button variant={"success"} size={'sm'} className="w-1/4 my-5 self-start">
            Create a New Post
        </Button>
      </Link>
      </main>
      
      
    </div>
  );
}
