"use client"

import ItemList from '@/components/ItemList'
import { useAtomValue} from "jotai"
import {displayNameAtom} from "@/basic/atom"

import React from 'react'
import Link from 'next/link'


const Post = () => {
  const displayName = useAtomValue(displayNameAtom)
  console.log(displayName);
  

  return (
    <div>

      <div className='h-10 flex justify-center items-center bg-slate-300'>
        <p className='flex items-center justify-center w-3/5 border-x-4 border-primary bg-slate-400 h-full text-2xl'>{displayName}</p>
      </div>
      <main className='border-t-4 border-primary'>
        <ItemList />
      </main>


    </div>
  )
}

export default Post