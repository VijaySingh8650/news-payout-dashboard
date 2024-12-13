"use client";


import { TypeOfArticleData } from '@/types';
import { convertDate } from '@/utils';
import Image from 'next/image';
import React from 'react';


type TypeOfPageProps = {
    data: TypeOfArticleData
}

const Article: React.FC<TypeOfPageProps> = ({data}) => {

  return (
    <div className='p-4 shadow-cardShadow rounded-lg w-[300px] md:w-[400px]'>
        <div className='h-[200px] w-full md:h-[300px] relative'>

          {data?.urlToImage &&  <Image src={data?.urlToImage} alt={data?.urlToImage} fill objectFit='cover'/>}

        </div>

        
        <h2 className="mt-2 text-primaryColor">{data?.title}</h2>
        <h2 className='mt-2'>{data?.content}</h2>
        <div className='mt-2 flex justify-between items-center'>
            <p >By - {data?.author}</p>
            <p>{data?.publishedAt ? convertDate(data?.publishedAt) : ""}</p>
        </div>
        

        
    </div>
  )
}

export default Article
