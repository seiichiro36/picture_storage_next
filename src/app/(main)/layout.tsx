import Header from '@/_components/Header';
import React from 'react'

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (<div>
          <div className="fixed z-10 w-full">
     {/* <Header /> */}
          </div>
      <div>{children}</div>
  </div>
  )
}

export default MainLayout