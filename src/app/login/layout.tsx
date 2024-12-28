import React from 'react'

const layout = ({
    children, newRegister, alreadyRegister}: Readonly<{
      children: React.ReactNode
      newRegister: React.ReactNode
      alreadyRegister: React.ReactNode
    }>) => {
  return (
    <div>
      <div className='flex justify-center pt-20 bg-gradient-to-b from-zinc-50 to-zinc-100 h-screen'>
        <div>
        {newRegister}
        {alreadyRegister}
        </div>
      </div>

  
    </div>
    // <div>{children}</div>
    )
}

export default layout