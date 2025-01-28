"use client";
import React from 'react'
import {  PlusCircle } from 'lucide-react';
// import { Button } from '../ui/Button';
import { DeleteButtonCategory } from './DeleteCategoryButton';
import { AddButtonCategory } from './AddCategoryButton';
import { EditButtonCategory } from './EditCategoryButton';
import Reveal from '../animation/Reveal';

interface CardCategoryProps {
    id: number;
    name: string;
}

const CardCategory: React.FC<{ categories: CardCategoryProps[] }> = ({
    categories
}) => {
    
  return (
    <Reveal>
    <div className="bg-white px-6 py-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg text-gray-800">Categories</h4>
                <AddButtonCategory className="flex items-center gap-1 text-purple-500 text-sm">
                    <PlusCircle size={20}  />
                    <p className='hidden md:block'>Add Category</p>
                    <p className='block md:hidden'>Add</p>
                </AddButtonCategory>
            </div>
            <div className="mt-4 space-y-2 h-32  overflow-y-auto">
                {categories.map((category,index)=>{
                    return (
                        <div key={index} className="flex items-center justify-between ">
                            <p className="text-sm text-gray-700">{category.name}</p>
                            <div className='flex gap-2 items-center'>
                                <EditButtonCategory categoryId={category.id} categoryName={category.name}
                                className='gap-1 px-3 py-4 rounded-xl bg-gray-500 hover:bg-gray-600 text-white'
                                >
                                    Edit
                                </EditButtonCategory>
                                <DeleteButtonCategory categoryId={category.id} className=' gap-1 px-2 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white'>
                                    Delete
                                </DeleteButtonCategory>

                            </div>
                            
                        </div>
                    )
                })}
                
            </div>
    </div>
    </Reveal>
  )
}

export default CardCategory