import React from 'react'
import LoginForm from "@/components/LoginForm"

const LoginPage = () => {
  return (

      <div>
        <div className='flex justify-center pt-20 bg-gradient-to-b from-zinc-50 to-zinc-100 h-screen'>
          <div>
                    <div className='w-full max-w-2xl mx-auto'>
                        <LoginForm  className="w-full"/>
                    </div>
          </div>
        </div>
      </div>
  )
}

export default LoginPage