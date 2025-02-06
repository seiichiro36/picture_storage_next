import Header from '@/_components/Header';
import React from 'react'

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className='mt-[32px] max-w-7xl mx-auto'>{children}</div>
    </div>
  )
}

export default MainLayout