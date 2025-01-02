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
  category: 'all',
}


function SearchFilter() {

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
    <div className='w-full flex flex-row gap-3'>
        
        <Input name='search' placeholder='Search Title here' onChange={handleInputChange}
        className='w-4/12 px-3 rounded-full'/>
        
        <select name="category" id="category" onChange={handleInputChange}
            className='text-sm border border-gray-300 rounded-md p-1'>
            <option value="">Select Category</option>
            <option value="article">Article</option>
            <option value="travel">Travel</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="history">History</option>
        </select>

        <select name="sort" id="sort" onChange={handleInputChange}
        className='text-sm border border-gray-300 rounded-md p-1'>
            <option value="desc">Lastest</option>
            <option value="asc">Oldest</option>
        </select>
        
  
        <SubmitButton variant={'success'} onClick={handleFilterClick}>Apply</SubmitButton>
        
        
        
    </div>
  )
}

export {SearchFilter}