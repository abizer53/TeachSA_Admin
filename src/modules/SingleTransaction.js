import React from 'react'

export default function SingleTransaction() {
  return (
    <div className='w-full bg-white border-b border-border-nput flex items-center justify-between px-5 py-4'>
        <div className='flex items-center gap-2 w-1/6'>
          <img src="/images/thumbnail.png" className='size-10 rounded-full' />  
          <h6 className='text-sm font-normal text-grey '>Google</h6>
        </div>
        <h6 className='text-sm font-normal text-grey w-1/6 text-center'>655225AL54901</h6>
        <h6 className='text-sm font-normal text-grey w-1/6 text-center'>Sept 10 ,2024 03:25 PM</h6>
        <h6 className='text-sm font-normal text-grey w-1/6 text-center'>Job Seeker</h6>
        <h6 className='text-sm font-normal text-grey w-1/6 text-center'>$12</h6>
        <h6 className='text-sm font-normal text-grey w-1/12 text-center'>View</h6>
    </div>
  )
}
