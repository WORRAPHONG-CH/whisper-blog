import React from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { DeleteButton } from './Delete-Button';
import { SquarePen, Trash2,ImageOff } from 'lucide-react';
import Link from 'next/link';
import Reveal from './animation/Reveal';


interface CardProps {
  userId: string,
  postId: string;
  title: string;
  content: string | '';
  categoryName?: string;
  updateAt: Date;
  imageUrl?:string;
}

export const CardPosts: React.FC<CardProps> = ({
  userId,
  postId,
  title,
  content,
  categoryName,
  updateAt,
  imageUrl,
}) => {

  return (
    <Reveal>
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-40 md:h-auto  w-full md:w-4/12 bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
        {imageUrl ? 
        <Image
        src={imageUrl}
        alt={title}
        fill
        sizes={'500'}
        priority={true}
        style={{ objectFit: 'cover' }}
      />
        :
        <ImageOff color='white' size={40}/>
        }
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        {/* <Reveal> */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{categoryName || 'Uncategorized'}</p>
          <p className='text-sm line-clamp-2'>{content}</p>
          <p className="text-xs text-gray-400">
            {new Date(updateAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        {/* </Reveal> */}
        
        {/* <Reveal> */}
        <div className="flex items-center justify-end gap-2 mt-4 h-8 ">
          <Link href={`/user/${userId}/post/edit-post/${postId}`}>
            <Button
              variant="default"
              className="flex items-center gap-1 px-2 py-4 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              <SquarePen size={18} />
              <span className="hidden md:inline">Edit</span>
            </Button>
          </Link>
          <DeleteButton
            variant="default"
            postId={postId}
            imageUrl={imageUrl}
            className="flex items-center gap-1 px-2 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 size={18} />
            <span className="hidden md:inline">Delete</span>
          </DeleteButton>
        </div>
        {/* </Reveal> */}
      </div>
    </div>
    </Reveal>
  );
};
