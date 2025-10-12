import React from 'react'

export default function SingleReport({data}) {
  return (
    <div className='w-full bg-white border-b border-border-nput flex items-center justify-between px-5 py-4'>
        <h6 className='text-sm font-normal text-black w-1/6'>{data?.type == 'JobSeekerReport' ? 'Seeker':'Employer'}</h6>
        <h6 className='text-sm font-normal text-black w-1/6 capitalize'>{data?.employer_name}</h6>
        <h6 className='text-sm font-normal text-black w-1/6 capitalize'>{data?.seeker_name}</h6>
        <h6 className='text-sm font-normal text-black w-2/6'>{data?.message || 'Not coming'}</h6>
    </div>
  )
}
