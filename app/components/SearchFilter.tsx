'use client'
import React,{useState} from 'react';
import { Input } from './ui/Input';
import { SubmitButton } from './Submit-Button';
// import axios from 'axios';
import {useRouter,useSearchParams} from 'next/navigation'

type FilterProps = {
  search: string,
  sort: string,
  category: string
}

const initialFilter:FilterProps = {
  search: '',
  sort: 'desc',
  category: '0',
}

interface CategoryProps{
  id:number,
  name:string
}

const SearchFilter = (
    {categories} :{categories:CategoryProps[]}
) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<FilterProps>(initialFilter);

    // console.log('filters:',filters);
    // console.log('searchParams:',searchParams);

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) =>{
      const {name,value} = e.target;
      // console.log(`name:${name} value:${value}`);

      setFilters((prevState) =>{
        return prevState ? {
          ...prevState,
          [name]: value,
        }:
        prevState
      })
    }
    
    const handleFilterClick = () =>{
      try{
        console.log('filters:',filters);
        const queryParams = new URLSearchParams(searchParams?.toString());
        Object.entries(filters).forEach(([key,value])=>{
          // console.log('key:',key,'value:',value);
          queryParams.set(key,value);
          });
        // console.log('queryParams:',queryParams.toString());
        router.push(`?${queryParams.toString()}`);

      }catch(error){
        console.log(error);
      }
    }
    
  return (
    <div className='w-full flex flex-col md:flex-row justify-center gap-3'>
        
        <Input name='search' placeholder='Search Title here' onChange={handleInputChange}
        className='w-full md:w-4/12 px-3 rounded-lg'/>
        
        <div className='flex justify-center gap-2'>
        {/* Category Filter */}
        <select name="category" id="category" onChange={handleInputChange}
            className='text-sm border border-gray-300 rounded-md p-1'>
            <option value={'0'}>All</option>
            {
              categories?.map((category,index)=>{
                return(
                  <option key={index} value={category.id}>{category.name}</option>
                )
              })
            }
        </select>

        {/* Date filter */}
        <select name="sort" id="sort" onChange={handleInputChange}
        className='text-sm border border-gray-300 rounded-md p-1'>
            <option value="desc">Lastest</option>
            <option value="asc">Oldest</option>
        </select>
        
  
        <SubmitButton variant={'success'} onClick={handleFilterClick}
        className='h-10 bg-purple-500 hover:bg-purple-800'
        >
          Apply
          </SubmitButton>
        </div>
        
        
    </div>
  )
}

export {SearchFilter}