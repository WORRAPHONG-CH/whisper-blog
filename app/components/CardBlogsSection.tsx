'use client';
import React from 'react'
import Image from 'next/image';
import Reveal from './animation/Reveal';
import Link from 'next/link';
import { Button } from './ui/Button';
import { ImageDown,UserCircle } from 'lucide-react';

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

function CardBlogs(
    {blogs}:{blogs:PostProp[]}
) {
  return (
    <div className="grid grid-cols-12 h-fit gap-y-5 md:gap-x-8 md:gap-y-3 ">
                {blogs?.map((blog) => (
                    <div key={blog.id}
                        className="col-span-12 lg:row-span-4 h-fit md:col-span-6 lg:col-span-4 p-4 rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105"
                    >
                        {/* Image card*/}
                        <Reveal className='w-full h-3/6'>
                        { blog.image ? 
                            <Image
                            src={blog.image}
                            alt={blog.title}
                            width={500} height={500}
                            priority={true}
                            
                            className="rounded-t-lg w-full h-48 object-cover"/>
                        :
                        <div className='flex justify-center h-3/6 bg-gray-400'>
                            <ImageDown color='white' size={190}/>
                        </div>
                        
                            
                        
                        }

                        </Reveal>
                        
                        {/* Title and Content */}
                        <div className="p-4">
                            <Reveal>
                            <h2 className="text-2xl line-clamp-2  font-bold mb-2 text-gradient bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                                {blog.title}
                            </h2>
                            </Reveal>
                            <Reveal className='mb-5'>
                            <Button className='bg-purple-500 rounded-lg text-white px-4 py-4'>
                                {blog.category.name}
                            </Button>
                            </Reveal>
                            <Reveal>
                                <p className="text-gray-600 mb-4 line-clamp-2 h-12 md:h-16">{blog.content}</p>
                            </Reveal>
                            <Reveal>
                            <div className='flex flex-col'>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className='relative flex justify-center items-center gap-2'>
                                        {blog.author.image ?
                                        <Image 
                                        src={blog.author.image}
                                        alt={blog.author.name}
                                        width={30}
                                        height={30}
                                        style={{objectFit:'cover'}}
                                        className='rounded-full'
                                        />
                                        :
                                        <UserCircle size={30} color='purple'/>
                                    }
                                        <p>By {blog.author.name}</p>
                                    </div>
                                    
                                    <p>{new Date(blog.createAt).toLocaleDateString()}</p>
                                    
                                </div>
                                <Link href={`/blogs/${blog.id}`}>
                                        <Button className="mt-4 h-10 px-4 py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg font-semibold shadow hover:opacity-90">
                                            Read More
                                        </Button>
                                </Link>
                            </div>
                            </Reveal>
                            
                        </div>
                    </div>
                ))}
                </div>
  )
}

export default CardBlogs