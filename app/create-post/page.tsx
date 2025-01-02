'use client'
import React from 'react';
import { useState } from 'react';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { SubmitButton } from '../components/Submit-Button';
import axios, {AxiosError} from 'axios';
import { useRouter } from 'next/navigation';

interface PostProp{
    title:string,
    content:string
    category?: string
}

const initialPost:PostProp = {
    title : '',
    content :'',
    category:'',
}

export default function Page() {

    const [post,setPost] = useState<PostProp>(initialPost);
    const [errorMessage,setErrorMessage] = useState<string>('')
    const router = useRouter(); // for redirect

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {name, value} = e.target;
        // console.log(`name:${name}, value:${value}`);

        // set value into state with Ternary oparator (callback must return)
        setPost((prevState)=>{
            return prevState ?  {
                ...prevState,
                [name] : value
            }:
            prevState
        })

    } 

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); // prevent default form submit
        console.log(post);
    try{
        // Validate form is not empthy
        if(!post.title || !post.content){
            throw new Error('Title or Content is required !!')
        }
        // Send data to create post if the form validated
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`,{
            title:post.title,
            content: post.content,
            category: post.category
        })
        router.push('/');


    }catch(error){
        console.log('error throw:',error);

        if(axios.isAxiosError(error)){
            const axiosError = error as AxiosError
            // setErrorMessage(axiosError.message);
            if(axiosError.response){
                setErrorMessage(axiosError.response.data? JSON.stringify(axiosError.response.data) : "Error Response Data");
            }
            else if(axiosError.request){
                setErrorMessage(axiosError.request);
            }
            else{
                setErrorMessage(axiosError.message);
            }
        }
        else{
            setErrorMessage((error as Error).message);
            }
        }
    }

  return (
    <div className='min-h-screen min-w-full py-10 px-20 flex flex-col gap-5'>
        <h1 className='text-2xl font-bold'>Create New Post</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-12 gap-2'>
            <div className='col-span-8 flex flex-col gap-2'>
                <Label htmlFor='title'>Title</Label>
                <Input type='text' id='title' name='title' placeholder='Enter title here' 
                onChange={handleInputChange}
                required/>
            </div>
            <div className='col-span-4 flex flex-col gap-2'>
                <Label htmlFor='category'>Category</Label>
                <select name="category" id="category" onChange={handleInputChange}
                    className='w-3/4 h-10 text-sm border border-gray-300 rounded-md shadow-md focus:shadow-lg focus:outline-none'>
                    <option value="">Select Category</option>
                    <option value="article">Article</option>
                    <option value="travel">Travel</option>
                    <option value="tech">Tech</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="history">History</option>
                </select>
            </div>
            <div className='col-span-12 flex flex-col gap-2'>
                <Label htmlFor='content'>Content</Label>
                <textarea name='content' placeholder='Enter your content here' cols={30} rows={5}
                className='flex flex-col justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                focus:shadow-lg'
                onChange ={handleInputChange}
                required/>
            </div>
            <div className='col-span-12 flex flex-col gap-3'>
                <SubmitButton variant={'success'} size={'default'} className=' w-2/12'>Submit</SubmitButton>
                {errorMessage && <div className='text-red-600 font-medium text-md'>{errorMessage}asdf</div>}
            </div>
            
        </form>
    </div>
  )
}

