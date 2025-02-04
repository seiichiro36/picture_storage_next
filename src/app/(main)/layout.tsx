import Header from '@/_components/Header';
import React from 'react'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body>
        <div>
          <div className="fixed z-10 w-full">
            <Header />
          </div>
          <div className='pt-[160px] max-w-7xl'>{children}</div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout