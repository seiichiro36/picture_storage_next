"use client"

import { useAtomValue} from "jotai"
import {displayNameAtom} from "@/basic/atom"

import { useRouter } from "next/navigation"
import React from 'react'
import Link from 'next/link'
import { Button } from "@/_components/ui/button"


const Post = () => {
  const router = useRouter()

  const displayName = useAtomValue(displayNameAtom)
  console.log(displayName);

  const handleLogout = () => {
    router.push("/login")
  }
  

  return (
    <div className="bg-red-500 h-screen">
      <main>
          <Button className="dark:md:hover:bg-fuchsia-600" onClick={() => handleLogout()}>logout</Button>
      </main>
    </div>
  )
}

export default Post