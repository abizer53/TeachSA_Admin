import React from 'react'
import Location from '../../public/icons/Location'
import Clock from '../../public/icons/Clock'
import Apple from '../../public/icons/Apple'
import Google from '../../public/icons/Google'
import Link from 'next/link'
import Button from '@/components/Button'
import AppliedShield from '../../public/icons/AppliedShield'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Tag from '../../public/icons/Tag'
import DollarCircle from '../../public/icons/DollarCircle'
dayjs.extend(relativeTime)
export default function JobCard({data}) {
    const router = useRouter()
    return (
        <div className='w-full shadow-searchbox border rounded-md bg-white overflow-hidden relative'>
            {data?.is_closed == 1 && <h6 className='bg-purple-400 text-white font-normal text-xs absolute rotate-45 py-1.5 px-4 w-24 text-center -right-6 top-2'>Closed</h6>}
            <img src={data?.job_thumbnail ? data?.job_thumbnail : '/images/event.jpg'} alt="" className='w-full rounded-t-md h-40 object-cover' />
            <div className='absolute top-2 left-2 flex items-center gap-2 flex-wrap'>
                {data?.job_priority == 1 && <p className='text-white rounded-md text-sm font-normal bg-green px-2 py-1'>Boosted Job</p>}
                <h5 className='px-2 py-1 shadow capitalize rounded-md font-normal text-sm bg-white text-green'>{data?.job_type}</h5>

            </div>
            <div className='px-4 py-2'>
                <Link href={`/jobs/${data?.id}`} className='text-black font-semibold text-xl font-sans flex hover:text-green capitalize'>{data?.job_title}</Link>
                <div className='w-full flex items-center mt-2 justify-between'>
                   {data?.post_anonymously !== 'yes' && <div className='flex flex-wrap items-center gap-2 mt-1'>
                        <img src={data?.company?.upload_logo ? data?.company?.upload_logo : "/images/event.jpg"} alt="logo" className='size-7 rounded-full shadow border' />
                        <h4 className='text-black font-medium text-sm capitalize'>{data?.company?.company_name ? data?.company?.company_name : "N/A"}</h4>
                    </div>}
                    <div className='flex flex-wrap items-center gap-2 mt-1'>
                        <Clock/>
                        <h6 className='text-grey font-normal text-sm'>{dayjs(data?.created_at).fromNow()}</h6>
                    </div>
                </div>
                
                <div className='w-full flex items-center justify-between mt-6 gap-2'>
                    <div className='flex items-center gap-2'>
                        <Location/>
                        <h6 className='text-grey font-normal text-sm capitalize truncate'>{data?.location}</h6>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h4 className='text-grey font-normal text-sm'>{data?.applied_job?.length ? data?.applied_job?.length : 0} Applicants</h4>
                        <AppliedShield/>
                    </div>
                </div>
                <div className='w-full flex items-center justify-between my-3 gap-2'>
                    <div className='flex items-center gap-2 w-1/2'>
                        <Tag/>
                        <h6 className='text-grey font-normal text-sm capitalize truncate'>{data?.job_category}</h6>
                    </div>
                    {data?.salary_negotiable === 'true' && <div className='flex flex-wrap items-center gap-2 justify-end'>
                        <h6 className='text-grey font-normal text-sm capitalize truncate'>Salary Negotiable</h6>
                    </div>}
                    {data?.salary_negotiable !== 'true' && <div className='flex flex-wrap items-center gap-2 justify-end'>
                        <h4 className='text-grey font-normal text-sm'>{data?.minimum_salary} - {data?.maximum_salary}</h4>
                        <DollarCircle/>
                    </div>}
                </div>
                <Button onClick={()=> router.push(`/jobs/${data.id}`)} variant="green-with-border" className="mt-6 mb-3"> View Job </Button>
            </div>
        </div>
    )
}
