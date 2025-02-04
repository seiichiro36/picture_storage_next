"use client"

import Link from 'next/link'
import React from 'react'
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
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom } from "jotai"
import { emailAtom } from '@/basic/atom'

const Header = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState('')

    const [atomUsername] = useAtom(emailAtom)

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams);

        params.set("q", searchValue)

        router.push(`?${params.toString()}`)
    }

    const handleLogout = () => {
        router.push("/login")
    }


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
                    {/* <a href="#" className='hover:text-blue-600'>Home</a>
          <a href="#" className='hover:text-blue-600'>About</a>
          <a href="#" className='hover:text-blue-600'>Contact</a> */}
                    <Link href="/arts"><Button variant="ghost">Home</Button></Link>
                    <Link href="/likes"><Button variant="ghost">Like</Button></Link>
                    <Link href="/post"><Button variant="ghost">Post</Button></Link>
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger><div className="w-12 h-12 bg-white rounded-full"></div></MenubarTrigger>
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