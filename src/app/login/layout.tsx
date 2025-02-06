"use client"
import { Button } from '@/_components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const LoginLayout = ({
  alreadyRegister,
  serviceAuthentication
}: {
  alreadyRegister: React.ReactNode
  serviceAuthentication: React.ReactNode
}) => {
  const router = useRouter()
  return (
    <div>
      <div className='flex justify-center pt-20 bg-gradient-to-b from-zinc-50 to-zinc-100 h-screen'>
      <ToastContainer />
        <div>
          <div className='pt-5'>
            {alreadyRegister}
          </div>
          {serviceAuthentication}
          <div><Button onClick={() => router.push("/register")} className='w-full mt-16 text-black hover:bg-[#a0a7b1]'>Emailで登録する</Button></div>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout