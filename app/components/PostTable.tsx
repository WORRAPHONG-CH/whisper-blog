
import React from 'react';
import { Button } from './ui/Button';
import { DeleteButton } from './Delete-Button';
import axios, {AxiosError} from 'axios';
import {Post} from '@prisma/client';
import Link from 'next/link';

interface PostTableProps{
    data:Post[]
}

const fetchPosts = async():Promise<PostTableProps> =>{
    try{
        // fetch data from api 
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`,{
            headers:{
                "Cache-Control":'no-store', // Ensure data is always fresh
            } 
        });

        // if response is success
        const data:PostTableProps = response.data;

        return data; 
        
    }catch(error:unknown){
        const errMessage = error as AxiosError;
        console.log(errMessage.message);
        throw errMessage;
    }
}

// const deletePost = async(id:number) =>{
//     try{
//         // delete post
//         await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`);
        

//     }catch(error){
//         console.log(error);
//     }
// }

export default async function PostTable() {
    const posts = await fetchPosts();

    // console.log("posts:",posts.data);

  return (
    <table className='w-full rounded-md overflow-y-hidden '>
        <thead className=''>
            <tr className='bg-gray-200 border-solid  h-12'>
                <th>Title</th>
                <th>Create At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {posts?.data?.map((post:Post)=>{
                return(
                    <tr key={post.id} className='border-solid h-12'>
                        <td className='px-3'>{post.title}</td>
                        <td>{new Date(post.createAt).toLocaleString('en-US',{
                            year:'numeric',
                            month:'long',
                            day:'numeric',
                            hour:'numeric',
                            minute:'numeric',
                        })}</td>
                        <td className='flex gap-2 justify-center items-center p-3'>
                        <Link href={`edit-post/${post.id}`}>
                            <Button variant={'primary'}>
                                Edit
                            </Button>
                        </Link>
                        <DeleteButton postId={post.id}>Delete</DeleteButton>
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
        
        
    </table>
  )
}

