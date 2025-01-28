import React from 'react';
import Image from 'next/image';
import axios,{ AxiosError} from 'axios';
import { ImageDown } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';

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

const fetchPost = async (postId:string):Promise<PostProp|undefined | null> =>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`)

        if(response.statusText !== 'OK'){
            throw new Error('Fail to fetch post !');
        }

        return response.data.post;


    }catch(error){
        if(axios.isAxiosError(error)){
            console.log((error as AxiosError).message);
        }else{
            console.log((error as Error).message);
        }
    }

}

export default async function BlogDetails(
    {params} : {params:Promise<{id:string}>}
) {

    const postId = (await params).id;
    console.log('PostId', postId);
    const post = await fetchPost(postId)
    console.log('post:',post)

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Image section */}
                <div className='w-full'>
                    {
                        post?.image ? 
                        <Image
                            src={post?.image}  
                            alt={post?.title}
                            width={500} height={500}
                            className="w-full h-72 object-cover"
                        />:
                        <ImageDown size={150} color='gray'/>

                    }

                </div>
                {/* Content Section */}
                <div className="py-5 px-8">
                    <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        {post?.title}
                    </h1>
                    
                    <div className='w-full flex justify-between items-center mb-6'>
                        <div className='w-full flex gap-4 md:gap-2 items-center'>
                            {
                                post?.author.image &&
                                <Image
                                src={post?.author.image}
                                alt={post?.author.name}
                                width={50} 
                                height={50}
                                style={{objectFit:'cover'}}
                                className='rounded-full'
                            />
                            }
                            <div className='flex flex-col gap-2 md:flex-row'>
                                <p className="textmd md:text-lg font-semibold text-gray-500">
                                    {`By ${post?.author.name}`}
                                </p>
                                <p className='text-sm text-gray-500 md:hidden'>{post?.updateAt && new Date(post.updateAt).toLocaleString('en-US',{
                                year:'numeric',
                                month:'numeric',
                                day:'numeric',
                                hour:'numeric',
                                minute:'numeric'
                                })}
                                </p>

                            </div>
                            


                        </div>
                        <p className='hidden md:block w-52 text-md text-gray-500'>{post?.updateAt && new Date(post.updateAt).toLocaleString('en-US',{
                            year:'numeric',
                            month:'numeric',
                            day:'numeric',
                            hour:'numeric',
                            minute:'numeric'
                        })}
                        </p>
                    </div>

                    
                    
                    
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {post?.content}
                    </p>
                    <h2 className="text-3xl text-center font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        {`See Something More Similar?`}
                    </h2>
                    {/* <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {`Good web design balances aesthetic appeal with functionality. It takes into account the user journey, ensuring that the website is easy to navigate and accessible on all devices. Responsive design is a must, and it's important to focus on speed and performance to keep users engaged. Visual hierarchy and strategic use of colors can also help guide the user’s attention to the most important content on the page.`}
                    </p> */}
                    <div className="mt-8 flex justify-center">
                        <Link href={'/blogs'}>
                            <Button className="px-6 py-3 h-12 md:h-14 text-md md:text-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow hover:opacity-90">
                                Explore More
                            </Button> 
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
