import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

export default function SingleReport({data}) {
  return (
    <div className='w-full bg-white border-b border-border-nput flex items-center justify-between px-5 py-4'>
      <h6 className='text-sm font-normal text-black w-1/6'>{data?.type == 'JobSeekerReport' ? 'Seeker':'Employer'}</h6>
      <Link href={`/job-providers/${data?.Employer_id}`} target='_blank' rel='noreferrer' className='text-sm font-normal text-black w-1/6 capitalize'>{data?.employer_name || 'N/A'}</Link>
      <Link href={`/job-seekers/${data?.JobSeeker_id}`} target='_blank' rel='noreferrer' className='text-sm font-normal text-black w-1/6 capitalize'>{data?.seeker_name || 'N/A'}</Link>
      <h6 className='text-sm font-normal text-black w-1/6 capitalize'>{dayjs(data?.created_at).format("DD MMM, YYYY")}</h6>
      <h6 className='text-sm font-normal text-black w-2/6'>{data?.message || 'Not coming'}</h6>
    </div>
  )
}
