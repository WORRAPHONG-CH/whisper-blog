'use client'
import React, { useState,useEffect,useRef, useTransition } from 'react';
import { Label } from '@/app/components/ui/Label';
import { Input } from '@/app/components/ui/Input';
import { SubmitButton } from '@/app/components/Submit-Button';
import axios, {AxiosError} from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FormMessage } from '@/app/components/FormMessage';
import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';
import { Category } from '@prisma/client';
import { ImageUp, Upload } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/utills/supabase/storage/clientStorage';

interface PostProp {
  title: string;
  content: string;
  categoryId: number;
  published: boolean;
}

type imageLocalProp = {
  file?: File | null,
  url?: string
}

const initialPost: PostProp = {
  title: '',
  content: '',
  categoryId: 0,
  published: false,
  
};

export default function Page() {
  const [post, setPost] = useState<PostProp>(initialPost);
  const [categories,setCategories] = useState<Category[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageLocal,setImageLocal] = useState<imageLocalProp>({
    file:null,
    url:''
  })
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  

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

    useEffect(()=>{
        fetchCategory();
    },[])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >
  ) => {
    const { name, value } = e.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleImageChange = async (e:React.ChangeEvent<HTMLInputElement>) =>{
    
      const files = e.target.files;
    if(files && files[0]){
    setImageLocal({
      file:files[0],
      url:URL.createObjectURL(files[0]),
    })
    }
    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      startTransition(async()=>{
        if (!post.title || !post.content || !post.categoryId) {
          throw new Error('Title or Content is required !!');
        }
        let uploadedImageUrl = ''
        if (imageLocal.file) {
          const { imageUrl, error } = await uploadImage({
            file: imageLocal.file,
            bucket: "attachments",
            folder: "posts"
          });
          if (error) {
            throw new Error(error);
          }
          
          uploadedImageUrl = imageUrl
        
        }
        // console.log(uploadedImageUrl)
        // console.log('submit:', post);

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
          title: post.title,
          content: post.content,
          categoryId: post.categoryId,
          published: true,
          authorId: session?.user.id,
          image: uploadedImageUrl,
        });
        if(session?.user.role === 'admin'){
          router.push(`/admin/${session?.user.id}/profile`)
        }
        else{
          router.push(`/user/${session?.user.id}/profile`);
        }
        
      })
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data
            ? JSON.stringify(error.response.data)
            : 'Error Response Data'
        );
      } else {
        setErrorMessage((error as Error).message);
      }
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex justify-center ">
      <div className="w-11/12 my-16 md:my-20 h-fit flex flex-col md:gap-3 md:w-2/3 lg:w-1/2 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 border-4 border-purple-400">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-purple-600">Create New Post</h1>
          <p className="text-gray-600">{`Author: ${session?.user.name}`}</p>
        </div>
        {/* Image */}
        <div className='w-full flex flex-col justify-center items-center gap-5 py-5'>
          <div className='relative overflow-hidden  w-11/12 h-44 md:h-72 flex justify-center items-center border-dashed border-4 border-purple-400 rounded-xl'>
          {
            imageLocal.url ?
            <Image src={imageLocal.url} 
            alt={imageLocal.url} 
            width={500} height={500}
            
            className='rounded-xl object-cover lg:object-contain'
            />
            :
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
          disabled={isPending}
          >
            {isPending ? "Uploading..." :"Upload Image"}
            <Upload color='white' size={24} />
          </Button>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <Label htmlFor="title" className="text-purple-700">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title here"
              onChange={handleInputChange}
              required
              className="w-full border-purple-300 focus:ring-purple-500"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Label htmlFor="category" className="text-purple-700">
              Category
            </Label>
            <select
              name="categoryId"
              id="categoryId"
              onChange={handleInputChange}
              className="w-full h-10 border border-purple-300 rounded-md focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {
                categories?.map((category,index)=>{
                  return(
                    <option key={index} value={Number(category.id)}>{category.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="col-span-12">
            <Label htmlFor="content" className="text-purple-700">
              Content
            </Label>
            <textarea
              name="content"
              placeholder="Enter your content here"
              cols={30}
              rows={5}
              onChange={handleInputChange}
              required
              className="w-full flex text-md md:text-md items-center px-3 py-2 border border-purple-300 rounded-md focus:ring-purple-500"
            />
          </div>
          <div className='col-span-12 w-full '>
            {errorMessage && <FormMessage success={false} message={errorMessage} />}
          </div>
          
          <div className="col-span-12 flex justify-between items-center">
          
            <Link href={`/${session?.user.role === 'admin' ? 'admin' : 'user'}/${session?.user.id}/profile`} className=''>
              <Button variant="secondary" className=" w-full h-8 px-4 py-3">
                Cancel
              </Button>

            </Link>
            <SubmitButton variant="success" className="h-8 px-4 py-3 bg-purple-500 hover:bg-purple-700">
              {isPending ? 'Submitting...' :'Submit'}
            </SubmitButton>
            
          </div>
        </form>
        
      </div>
    </div>
  );
  
}
