'use client'

import React from 'react'
import { useRouter } from "next/navigation"
import { Button } from '@/_components/ui/button'
 


const Detail = () => {
  const router = useRouter()  

  return (
    <div>
      <Button onClick={() => router.back()} >戻る</Button>
      <div>Detail</div>
    </div>
  )
}

export default Detail