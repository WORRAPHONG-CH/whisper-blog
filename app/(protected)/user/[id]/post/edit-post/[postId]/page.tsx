'use client';

import React from 'react'
import { useState, useEffect,useRef,useTransition } from 'react';
import { Label } from '@/app/components/ui/Label';
import { Input } from '@/app/components/ui/Input';
import axios, {AxiosError} from 'axios';
import {Post} from '@prisma/client';
import { useParams } from 'next/navigation';
import { SubmitButton } from '@/app/components/Submit-Button';
import {useRouter} from 'next/navigation';
import { Button } from '@/app/components/ui/Button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Category } from '@prisma/client';
import Image from 'next/image';
import { ImageUp, Upload } from 'lucide-react';
import { uploadImage } from '@/utills/supabase/storage/clientStorage';


type imageLocalProp ={
    file?:File | null, 
    url?:string
}

export default function Page(

) {

    const params = useParams();
    const router = useRouter();
    const {data:session} = useSession();
    const imageInputRef = useRef<HTMLInputElement>(null);
    

    if(!session || !session?.user){
      router.push('/sign-in');
    }

    const id = params.postId; // Get id from params url
    const [post,setPost] = useState<Post | null>(null) 
    const [errorMessage,setErrorMessage] = useState<string>('');
    const [categories,setCategories] = useState<Category[] | null>(null);
    const [imageLocal,setImageLocal] = useState<imageLocalProp>({
        file:null,
        url:''
    })
    const [isPending,startTransition] = useTransition();
    // console.log('id:',params)


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
            
            setPost(response.data.post); 
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
    const fetchCategory = async () =>{
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/category`);

            if(!response){
                throw new Error('Fetch category fail !');
            }
            
            setCategories(response.data.results);

        }catch(error){
            if(axios.isAxiosError(error)){  
                setErrorMessage((error as AxiosError).message)
            }
            else{
                setErrorMessage((error as Error).message)
            }
        }

    }
    

    // Fetch post to display before edit at first time render
    useEffect(()=>{
        fetchCategory();
        fetchPost();
    },[id]) // Re-run fetch if the `id` changes

    const handleImageChange = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        const files = e.target.files;

        if(files && files[0]){

            setImageLocal({
                file:files[0],
                url:URL.createObjectURL(files[0]),
            })
        }
    }

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
        
        try{
            if(!post?.title || !post?.content || !post?.categoryId){
                throw new Error('Require Title, Content, Category field');
            }
            console.log(post);
            startTransition(async()=>{
            let updateImage = ''
            if(imageLocal.file){
                const {imageUrl,error} = await uploadImage({
                    file:imageLocal.file,
                    bucket:'attachments',
                    folder:'posts'
                });
                if(error){
                    throw new Error(error);
                }
                updateImage = imageUrl;
            }

            // Update post with POST method to api
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`,{
                title:post.title,
                content:post.content,
                categoryId:Number(post.categoryId),
                published:true,
                image:updateImage
            });

            router.push(`/${session?.user.role ==='admin'? 'admin': 'user'}/${session?.user.id}/profile`);
        })
            
        }catch(error){
            if(axios.isAxiosError(error)){
                handleAxiosError(error)
            }
            else{
                setErrorMessage((error as Error).message);
            };
        };
    }
    // console.log('posts:',post)

    return (
        <div className='min-w-full min-h-screen flex flex-col items-center gap-5 md:px-10 md:py-10 bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200'>
            <div className='w-11/12 h-fit flex flex-col gap-5 mt-10 md:w-8/12 xl:w-2/4 px-5 py-5 md:px-7 md:py-5 lg:px-10 lg:py-5 bg-slate-50 rounded-2xl shadow-2xl border-4 border-purple-300'>
            <div className=' flex flex-col gap-4  items-center md:justify-between'>
                <h1 className='text-2xl md:text-3xl text-purple-600  font-bold'>Edit Post </h1>
                <div className='w-full flex flex-col  lg:flex-row justify-center lg:justify-between items-start'>
                    <p className='text-gray-500 text-sm font-extralight'>
                      {/* ?? '': The nullish coalescing operator (??) provide a default value when a variable is either null or undefined */}
                      Create at: {new Date(post?.createAt ?? 'None').toLocaleString('en-US',{
                          year:'numeric',
                          month:'numeric',
                          day:'numeric',
                          hour:'numeric',
                        minute:'numeric'})} </p>
                    <p className='text-gray-500 text-sm font-extralight'>
                    Last Update: {new Date(post?.updateAt ?? 'None').toLocaleString('en-US',{
                      year:'numeric',
                      month:'numeric',
                      day:'numeric',
                      hour:'numeric',
                      minute:'numeric'
                      })}
        
                    </p>
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-5 py-5'>
          <div className='relative overflow-hidden  w-11/12 h-44 md:h-72 flex justify-center items-center border-dashed border-4 border-purple-400 rounded-xl'>
          {
            post?.image ?
            <Image src= {post.image} 
            alt={post.title} 
            width={500} height={500}
            className='rounded-xl object-cover lg:object-contain'
            />
            :
            // Add image if the image does not exists at database 
            imageLocal.url ? <Image src= {imageLocal.url} 
            alt={imageLocal.url} 
            width={500} height={500}
            className='rounded-xl object-cover lg:object-contain'
            />: 
            <ImageUp size={120} color='purple'/>
            
            }
          </div>
          
          <Input 
          type='file' 
          accept='image/*' 
          hidden multiple 
          ref={imageInputRef} 
          onChange={handleImageChange} 
          className='hidden'/>
          <Button variant={'default'} className='bg-purple-500 h-12 px-3 flex gap-2 rounded-lg text-white hover:bg-purple-700'
          onClick={()=>{imageInputRef.current?.click()}}
        //   disabled={isPending}
          >
            {isPending ? "Updateing..." :"Update Image"}
            <Upload color='white' size={24} />
          </Button>
        </div>
                
            </div>
            
            <form onSubmit={handleSubmit} className=' grid grid-cols-12 gap-2 md:gap-5'>
                <div className='col-span-12 md:col-span-8 flex flex-col gap-2'>
                    <Label htmlFor='title' className='text-purple-700'>Title</Label>
                    <Input type='text' name='title' id='title' placeholder='Edit title here' className='text-sm md:text-md'
                    value={post?.title || ''}
                    onChange={handleInputChange}
                
                    required/>
                </div>
                <div className='col-span-12 md:col-span-4 flex flex-col gap-2'>
                    <Label htmlFor='category text-purple-600' className='text-purple-700'>Category</Label>
                    <select name="categoryId" id="categoryId" onChange={handleInputChange}
                    className='w-full h-10 md:w-3/4 md:h-full rounded-md shadown-md border text-sm border-gray-300 hover:shadow-lg'>
                        <option value={post?.categoryId} >{post?.categoryId ?
                        categories?.map((categories)=>{
                                if(categories.id === post.categoryId){
                                    return categories.name
                                }
                        })
                        : 'Select Category'}</option>
                        {categories?.map((categories,index)=>{
                            if(categories.id === post?.categoryId){
                                return null
                            }
                            else{
                                return(
                                    <option key={index} value={categories.id}>{categories.name}</option>
                                )
                            }
                        })}
                    </select>
                </div>
                <div className='col-span-12 flex flex-col gap-2'>
                    <Label htmlFor='content text-purple-600' >Content</Label>
                    <textarea rows={6} id='content' name='content' placeholder='Edit content here'
                    className='flex text-sm md:text-md items-center px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:shadow-lg'
                    value={post?.content || ''}
                    onChange={handleInputChange}
                    required/>
                </div>
                <div className="col-span-12 flex justify-between items-center">
                <Link href={ `/${session?.user.role ==='admin'? 'admin': 'user'}/${session?.user.id}/profile`} className=''>
                    <Button variant="secondary" className=" w-full h-8">
                        Cancel
                    </Button>
                    </Link>
                    <SubmitButton variant="success" className="h-8 bg-purple-500 hover:bg-purple-700">
                    {isPending ? 'Updating...': 'Update'}
                    </SubmitButton>
                    
                </div>
                {errorMessage && <div className='text-red-600 '>{errorMessage}</div>}
            </form>
            </div>
        </div>
    )
}

