import React from 'react'
import LoginForm from "@/componentsPage/LoginForm"

const LoginPage = () => {
  return (
    <div>
        <div className='bg-gradient-to-b from-zinc-200 to-zinc-300 h-screen'>
            <div className='text-2xl font-bold p-4'>LoginPage</div>
                    <div className='w-full max-w-2xl mx-auto'>
                        <LoginForm  className="w-full"/>
                    </div>
        </div>
    </div>
  )
}

export default LoginPage