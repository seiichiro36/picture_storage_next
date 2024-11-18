import React from 'react'

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (<div>
      <div>{children}</div>
  </div>
  )
}

export default MainLayout