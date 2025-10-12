import Link from '@/components/Link'
import React from 'react'

export default function SingleVerification({data}) {
  return (
    <div className='w-full flex items-center justify-between border-b border-border-nput px-5 py-3 bg-white'>
        <h6 className='text-sm font-normal text-black  w-3/12'>{data?.full_name ? data?.full_name : 'N/A' }</h6>
        {/* <h6 className='text-sm font-normal text-black w-1/6 text-center'>{data?.id}</h6> */}
        <h6 className='text-sm font-normal text-black w-4/12 break-all'>{data?.email}</h6>
        <h6 className='text-sm font-normal text-black w-2/12 text-center'>{data.hasOwnProperty("company_name")? 'Job Provider':"Job Seeker"}</h6>
        <div className="w-2/12 flex items-center justify-center">
          {data?.is_verify == '0' && <h6 className='text-sm font-normal bg-yellow px-2 py-1 rounded-md text-black w-fit text-center'>Pending</h6>}
          {data?.is_verify == '1' && <h6 className='text-sm font-normal bg-green px-2 py-1 rounded-md text-white w-fit text-center'>Verified</h6>}
          {data?.is_verify == '2' && <h6 className='text-sm font-normal bg-danger px-2 py-1 rounded-md text-white w-fit text-center'>Rejected</h6>}
          {data?.is_verify == 3 && <h6 className='text-sm font-normal bg-blue px-2 py-1 rounded-md text-black w-fit text-center'>Reverification</h6>}
        </div>
        {data.hasOwnProperty("company_name") && <Link href={`/verifications/${data?.id}?type=provider`} className='text-sm font-normal text-black w-1/12 text-center'>View</Link>}
        {!data.hasOwnProperty("company_name") && <Link href={`/verifications/${data?.id}?type=seeker`} className='text-sm font-normal text-black w-1/12 text-center'>View</Link>}
    </div>
  )
}
