'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import { Label } from '@/app/components/ui/Label';
import { Input } from '@/app/components/ui/Input';
import axios, {AxiosError} from 'axios';
import {Post} from '@prisma/client';
import { useParams } from 'next/navigation';
import { SubmitButton } from '@/app/components/Submit-Button';
import {useRouter} from 'next/navigation';



export default function Page() {

    const params = useParams();
    const router = useRouter();

    const id = params.id; // Get id from params url
    const [post,setPost] = useState<Post | null>(null) 
    const [errorMessage,setErrorMessage] = useState<string>('');
    


    const handleAxiosError = (error: AxiosError) =>{
        const axiosError = error as AxiosError; 
        if(axiosError.response){
            console.log("Error response:",axiosError.response.statusText)
            console.log(axiosError.response)
            setErrorMessage(axiosError.response.statusText ? axiosError.response.request.responseURL + ' ' + axiosError.response.statusText: 'Axios Response Fail')
        }
        else if(axiosError.request){
            console.log("Error request:",axiosError.request.message)
            setErrorMessage(axiosError.request.message);
        }
        else{
            console.log(axiosError.message);
            setErrorMessage(axiosError.message);
        }

    }

    const fetchPost = async () =>{
        try{
            // Fetch post
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`); // axios response => {data:...}
            // Fetch Success
            setPost(response.data.data); 
            // setTitle()
        }catch(error){
            if(axios.isAxiosError(error)){
                handleAxiosError(error)
            }
            else{
                setErrorMessage((error as Error).message)
            }
        }
    }

    // Fetch post to display before edit at first time render
    useEffect(()=>{
        fetchPost();
    },[id]) // Re-run fetch if the `id` changes


    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {name,value} = e.target;  // Destructure name and value from the event's target
        // console.log(name,':',value)\
        
        // Ternary Oparator => ensure that prevState has value
        setPost((prevState) => { // callback => return
            return prevState? { 
                ...prevState, // spread oparator
                [name]:value, // set new value to state
            }: prevState
        })
        //Truthy prevState: If prevState is truthy, it returns a new state object:
        //Falsy prevState: If prevState is falsy, it simply returns prevState without making any changes.
        
    };
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); // prevent refresh after submit form
        console.log(post);
        try{
            if(!post?.title || !post?.content || !post?.category){
                throw new Error('Require Title, Content, Category field');
            }
            // Update post with POST method to api
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`,{
                title:post.title,
                content:post.content,
                category:post.category,
            });

            router.push('/')
            
        }catch(error){
            if(axios.isAxiosError(error)){
                handleAxiosError(error)
            }
            else{
                setErrorMessage((error as Error).message);
            };
        };
    }


    return (
        <div className='min-w-full min-h-screen flex flex-col gap-5 px-10 py-10'>
            <div className='w-3/4 flex flex-row items-center justify-between'>
                <h1 className='text-2xl font-bold'>Edit Post {id}</h1>
                <p className='text-gray-500 text-sm font-extralight'>
                    {/* ?? '': The nullish coalescing operator (??) provide a default value when a variable is either null or undefined */}
                    Create at: {new Date(post?.createAt ?? 'None').toLocaleString('en-US',{
                        year:'numeric',
                        month:'numeric',
                        day:'numeric',
                        hour:'numeric',
                        minute:'numeric'})} </p>
            </div>
            
            <form onSubmit={handleSubmit} className='w-3/4 grid grid-cols-12 gap-5'>
                <div className='col-span-8 flex flex-col gap-2'>
                    <Label htmlFor='title'>Title</Label>
                    <Input type='text' name='title' id='title' placeholder='Edit title here'
                    value={post?.title || ''}
                    onChange={handleInputChange}
                    required/>
                </div>
                <div className='col-span-4 flex flex-col gap-2'>
                    <Label htmlFor='category'>Category</Label>
                    <select name="category" id="category" onChange={handleInputChange}
                    className='w-3/4 h-full rounded-md shadown-md border text-sm border-gray-300 hover:shadow-lg'>
                        <option value='' >{post?.category ? post?.category : 'Select Category'}</option>
                        <option value="article">Article</option>
                        <option value="travel">Travel</option>
                        <option value="tech">Tech</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="history">History</option>
                    </select>
                </div>
                <div className='col-span-12 flex flex-col gap-2'>
                    <Label htmlFor='content' >Content</Label>
                    <textarea rows={5} id='content' name='content' placeholder='Edit content here'
                    className='flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:shadow-lg'
                    value={post?.content || ''}
                    onChange={handleInputChange}
                    required/>
                </div>
                <div className='col-span-12 flex flex-col gap-3'>
                    <SubmitButton variant={'success'} className='w-3/12'>Update Change</SubmitButton>
                    {errorMessage && <div className='text-red-600 '>{errorMessage}</div>}
                </div>
                
            </form>
        </div>
    )
}

