import Header from '@/_components/Header';
import React, { Suspense } from 'react'
import Loading from './loading';

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
          <Suspense fallback={<Loading />}>
            <div className='pt-[160px] max-w-7xl mx-auto'>{children}</div>
          </Suspense>
        </div>
      </body>
    </html>
  )
}

export default RootLayout