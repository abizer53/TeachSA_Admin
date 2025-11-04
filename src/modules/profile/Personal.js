import dayjs from 'dayjs'
import React from 'react'

export default function Personal({data,type}) {
    
    return (
        <div className='w-full h-fit flex flex-wrap items-end justify-between bg-white p-5 rounded-lg'>
            <div className='w-full flex items-center justify-between'>
                <h4 className='text-black font-sans text-xl font-semibold'>Personal Details</h4>
            </div>
            <div className='w-full flex items-center mt-6'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Full Name</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data.full_name ? data.full_name : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Email</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6 break-words'>{data?.email ? data?.email : "N/A"}</h5>
            </div>
            {/* <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Phone Number</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.phone ? data?.phone : "N/A"}</h5>
            </div> */}
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>DOB</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'> {type != 'seeker' ?  data?.DOB ? dayjs(data?.DOB).format("DD MMM YYYY") : "N/A" : data?.profile?.DOB ? dayjs(data?.profile?.DOB).format("DD MMM YYYY") : "N/A"}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>ID/Passport Number</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{type == 'provider' ?  data?.id_passport_number ? data?.id_passport_number : 'N/A'  : data?.profile?.ID_number ? data?.profile?.ID_number : 'N/A'}</h5>
            </div>
            {type == 'seeker' && <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Sace ID Verified</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data.sace_id_verification == '1' ? "Yes" : 'No'}</h5>
            </div>}
        </div>
    )
}
