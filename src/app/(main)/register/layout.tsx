import React from 'react'

const InitResisterLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  => {
  return (
   <div className='pt-10'>{children}</div>
  )
}

export default InitResisterLayout