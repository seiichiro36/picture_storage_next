import React from 'react'
import './globals.css' 

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="ja">
      <body>
        <div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout