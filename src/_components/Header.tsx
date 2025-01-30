"use client"

import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import auth from '@/firebase'
import Link from 'next/link'
import {  useRouter } from "next/navigation"
import React from 'react'

const Header = () => {

  const handleSignOut = () => {
    const router = useRouter()
    auth.signOut()

    router.push("/posts")
  }

  return (
    <div>
<header className='h-56 bg-gray-700 w-full border-b-4 border-primary'>
<div className='flex justify-between items-center'>
  <div>
    <div className='pl-20 pt-3' > 
    <div className='flex items-center space-x-4'>

        <Input className='w-40'/>

      <Button>検索</Button>
    </div>
    </div>
  </div>
  <div className='outline-none'>
  </div>
  <div className='flex flex-col items-center ml-[120px]'>
    <Link href="/login">
      <Button className='mt-5 mr-10  w-32' onClick={() => handleSignOut()}>サインアウト</Button>
    </Link>
    <Link href="/posts/new">
     <Button className='mt-10 mr-10 w-32'>投稿</Button>
    </Link>
  </div>
</div>

</header>
    </div>
  )
}

export default Header
