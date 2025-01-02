
import React from 'react';
import { Button } from './ui/Button';
import { DeleteButton } from './Delete-Button';
import {Post} from '@prisma/client';
import Link from 'next/link';


export default async function PostTable({ posts }: {posts:Post[]} ) {
    

    return (
        <div className='w-full overflow-auto max-h-[70vh] border border-gray-200 shadow-xl rounded-2xl'>
            <table className='min-w-full border-collapse table-fixed'>
                <thead className=' bg-gray-300 rounded-lg sticky top-0'>
                    <tr className='h-12 w-full'>
                        <th className='w-4/12'>Title</th>
                        <th className='w-2/12'>Category</th>
                        <th className='w-4/12'>Create At</th>
                        <th className='w-1/12'>Actions</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-hidden'>
                    {posts?.map((post: Post) => (
                        <tr key={post.id} className='h-12'>
                            <td className='border-b px-2'>{post.title}</td>
                            <td className='border-b text-centers'>{post.category ? post.category : 'null'}</td>
                            <td className='border-b'>
                                {new Date(post.createAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </td>
                            <td className='border-b flex gap-2 justify-center items-center p-3'>
                                <Link href={`edit-post/${post.id}`}>
                                    <Button variant={'primary'} className='rounded-full'>
                                        Edit
                                    </Button>
                                </Link>
                                <DeleteButton postId={post.id} className='rounded-full'>
                                    Delete
                                </DeleteButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

