import ItemList from '@/components/ItemList'
import React from 'react'

const Mypage = () => {
  return (
    <div className='flex'>
      <div className='w-1/3 bg-primary h-screen overflow-y-auto'>
        <div className='h-1/2 bg-slate-300 pt-20'>
          <img src="./test_data/test_3.png" className='w-80 rounded-full  mx-auto' alt="" />
        </div>
        <div className='bg-slate-50 h-1/2'>

        </div>
      </div>
      <div className='h-screen bg-slate-300 w-2/3 overflow-y-auto'>
        <div className='h-80 bg-slate-50 w-full'>
        <img src="./test_data/test_10.png" className='w-full h-full object-cover' alt="" />

        </div>
        <div className='mt-4 mb-20'>
          <ItemList />
        </div>
      </div>
    </div>
  )
}

export default Mypage