import Link from '@/components/Link'
import React from 'react'

export default function Onboarding({children}) {
  return (
    <div className='flex flex-wrap w-full'>
        <div className='w-full bg-green flex flex-wrap py-4'>
            <div className='layout-container flex flex-wrap items-center justify-between'>
                <div className="bg-white px-4 py-2 rounded-md">
                    <img src={"/logo.png"} className='w-56 rounded-md' />
                </div> 
                <div >
                    <Link className='text-primary3 text-white font-bold py-1 ' href="/">Log in</Link>
                </div>
            </div>
        </div>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}
