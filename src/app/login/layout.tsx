import React from 'react'

const layout = ({
    children, newRegister, alreadyRegister, serviceAuthentication}: Readonly<{
      children: React.ReactNode
      newRegister: React.ReactNode
      alreadyRegister: React.ReactNode
      serviceAuthentication: React.ReactNode
    }>) => {
  return (
    <div>
      <div className='flex justify-center pt-20 bg-gradient-to-b from-zinc-50 to-zinc-100 h-screen'>
        <div>
        {newRegister}
        {alreadyRegister}
        {serviceAuthentication}
        </div>
      </div>

  
    </div>
    // <div>{children}</div>
    )
}

export default layout