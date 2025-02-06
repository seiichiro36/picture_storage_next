"use client"

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from "./ui/input"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from ".//ui/menubar"
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom } from "jotai"
import { emailAtom } from '@/basic/atom'
import { getProfileImage } from '@/firebase'
import Image from 'next/image'

const Header = () => {
    const router = useRouter()
    const imgRef = useRef(null);

    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [atomUsername] = useAtom(emailAtom)

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams);

        params.set("q", searchValue)

        router.push(`?${params.toString()}`)
    }

    const handleLogout = () => {
        router.push("/login")
    }


    function updateProfileImage(imgElement, imageUrl) {
        if (imageUrl) {
            imgElement.src = imageUrl;
        }
    }

    const email = 'aaa@gmail.com'

    useEffect(() => {
        const fetchProfileImage = async () => {
          try {
            const imageUrl = await getProfileImage(email);
            if (imgRef.current) {
              updateProfileImage(imgRef.current, imageUrl);
            }
          } catch (error) {
            console.error('画像取得エラー', error);
          }
        };
    
        fetchProfileImage();
      }, [email]);


    return (
        <header className='w-full h-[160px] bg-[#a7c6ed] shadow-md'>
            <nav className='h-full max-w-7xl mx-auto px-4 flex items-center justify-between'>
                <div className='text-2xl font-bold'>Logo</div>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <form onSubmit={handleSubmit} className='flex'>
                        <Input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="検索" />
                        <Button type="submit" className='ml-3 w-40 bg-[#3b5a9b] hover:bg-[#1e3a78]'>Search</Button>
                    </form>

                </div>
                <div className='flex gap-7'>
                    <Link href="/arts"><Button variant="ghost">Home</Button></Link>
                    <Link href="/likes"><Button variant="ghost">Like</Button></Link>
                    <Link href="/post"><Button variant="ghost">Post</Button></Link>
                    <Menubar className='border-none focus:ring-0'>
                        <MenubarMenu>
                            <MenubarTrigger className="p-0 focus:outline-none focus:ring-0" >
                                <img
                                    ref={imgRef}
                                    alt="プロフィール画像"
                                    className='w-24 h-24 rounded-full object-cover  object-center' />
                            </MenubarTrigger>
                            <MenubarContent>

                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>{atomUsername}</MenubarItem>
                                <MenubarItem>New Window</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Share</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Print</MenubarItem>
                                <MenubarItem><p className='text-red-600 cursor-pointer'><button onClick={() => { handleLogout() }}>Logout</button></p></MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>

                </div>
            </nav>
        </header>
    )
}

export default Header