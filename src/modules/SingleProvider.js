import Link from '@/components/Link'
import React from 'react'

export default function SingleProvider({data}) {
  return (
    <div className='w-full flex items-center justify-between border-b border-border-nput px-5 py-3 bg-white'>
        <div className='flex items-center gap-2 w-3/12'>
          {data?.upload_logo && <img src={data?.upload_logo ? data?.upload_logo : "/images/thumbnail.png"} className='size-10 rounded-full' />  }
          <h6 className='text-sm font-normal text-black '>{data?.company_name ? data?.company_name : "N/A"}</h6>
        </div>
        {/* <h6 className='text-sm font-normal text-black w-1/6'>6154241</h6> */}
        {/* <h6 className='text-sm font-normal text-black w-1/6 break-all'>{data?.company_registration_number}</h6> */}

        <h6 className='text-sm font-normal text-black w-2/12'>{data?.full_name}</h6>
        <div className='w-3/12'>
          <h6 className='text-sm font-normal text-black break-all'>{data?.email}</h6>
          <h6 className='text-sm font-normal text-black mt-1'>{data?.phone}</h6>
        </div>
        <div className="w-2/12 flex items-center justify-center">
          {data?.is_verify == '0' && data?.is_block < 3 && <h6 className='text-sm font-normal bg-yellow px-2 py-1 rounded-md text-black w-fit text-center'>Pending</h6>}
          {data?.is_verify == 3 && <h6 className='text-sm font-normal bg-blue px-2 py-1 rounded-md text-black w-fit text-center'>Reverification</h6>}

          {data?.is_verify == '1' && data?.is_block == '1' && <h6 className='text-sm font-normal bg-green px-2 py-1 rounded-md text-white w-fit text-center'>Verified</h6>}
          {data?.is_verify == '1' && data?.is_block == '2' && <h6 className='text-sm font-normal bg-danger px-2 py-1 rounded-md text-white w-fit text-center'>Blocked</h6>}
          {data?.is_verify == '1' && data?.is_block == '0' && <h6 className='text-sm font-normal bg-green px-2 py-1 rounded-md text-white w-fit text-center'>Verified</h6>}

          {data?.is_verify == '2' && data?.is_block < 3 && <h6 className='text-sm font-normal bg-danger px-2 py-1 rounded-md text-white w-fit text-center'>Rejected</h6>}
        </div>
        <Link href={`/job-providers/${data?.id}`} className='text-sm font-normal text-black w-1/12 text-center'>View</Link>
    </div>
  )
}
