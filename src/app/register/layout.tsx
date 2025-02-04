import Header from '@/_components/Header';
import React from 'react'

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className='pt-[160px] max-w-7xl'>{children}</div>
    </div>
  )
}

export default MainLayout