import ItemList from '@/components/ItemList'

import React from 'react'


const Post = () => {
  return (
    <div>

      <div className='h-10 flex justify-center items-center bg-slate-300'>
        <p className='flex items-center justify-center w-3/5 border-x-4 border-primary bg-slate-400 h-full text-2xl'>こんにちは</p>
      </div>
      <main className='border-t-4 border-primary'>
        <ItemList />
      </main>
    </div>
  )
}

export default Post