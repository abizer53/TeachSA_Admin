import React from 'react'

export default function CompanyDetail({data}) {
   
    return (
        <div className='w-full flex flex-wrap items-start justify-between bg-white p-5 rounded-lg'>
            <div className="w-full">
                <div className='w-full flex items-center justify-between'>
                    <h4 className='text-black font-sans text-xl font-semibold'>Company Details</h4>
                
                </div>
                <div className='w-full flex items-center mt-6'>
                    <h5 className='text-grey font-medium text-sm w-2/6'>Company Name</h5>
                    <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                    <h5 className='text-black font-normal text-sm w-3/6'>{data?.company_name ? data?.company_name : "N/A"}</h5>
                </div>
                <div className='w-full flex items-center mt-4'>
                    <h5 className='text-grey font-medium text-sm w-2/6'>Registration Number</h5>
                    <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                    <h5 className='text-black font-normal text-sm w-3/6'>{data?.company_registration_number ? data?.company_registration_number : "N/A"}</h5>
                </div>
                <div className='w-full flex items-center mt-4'>
                    <h5 className='text-grey font-medium text-sm w-2/6'>Final Job Category</h5>
                    <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                    <h5 className='text-black font-normal text-sm w-3/6 break-words'>{data?.job_category ? data?.job_category : "N/A by admin"}</h5>
                </div>
                {/* <div className='w-full flex items-center mt-4'>
                    <h5 className='text-grey font-medium text-sm w-2/6'>ID Number</h5>
                    <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                    <h5 className='text-black font-normal text-sm w-3/6'>{data?.id_number ? data?.id_number : "N/A"}</h5>
                </div> */}
            </div>
        </div>
    )
}
