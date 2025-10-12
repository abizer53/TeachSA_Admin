import Link from '@/components/Link'
import React from 'react'

export default function SingleJob({data}) {
  return (
    <div className='w-full flex items-center justify-between border-b border-border-nput px-5 py-3 bg-white'>
      <div className='flex items-center gap-2 w-1/6'>
        <img src={data?.company?.upload_logo ? data?.company?.upload_logo : "/images/thumbnail.png"} className='size-10 rounded-full' />  
        <h6 className='text-sm font-normal text-grey '>{data?.company?.company_name}</h6>
      </div>
      <h6 className='text-sm font-normal text-grey w-1/6'>{data?.job_title}</h6>
      <h6 className='text-sm font-normal text-grey w-1/12 text-center'>{data?.job_category}</h6>
      <h6 className='text-sm font-normal text-grey w-1/12 text-center'>{data?.job_type}</h6>
      <h6 className='text-sm font-normal text-grey w-1/12 text-center'>{data?.applied_job?.length}</h6>
      <Link href={`/jobs/${data.id}`} className='text-sm font-normal text-grey w-12 text-center'>View</Link>
    </div>
  )
}
