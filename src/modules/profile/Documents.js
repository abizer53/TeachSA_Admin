import React from 'react'
import UploadedDocument from './UploadedDocument'

export default function Documents() {
  
  return (
    <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg my-8'>
      <div className='flex items-center justify-between w-full'>
        <h4 className='text-black font-sans text-2xl font-semibold'>Documents Uploaded</h4>
      </div>
      <div className='w-full grid grid-cols-4 gap-8 mt-5'>
        <UploadedDocument/>
        <UploadedDocument/>
        <UploadedDocument/>
        <UploadedDocument/>
      </div>
    </div>
  )
}
