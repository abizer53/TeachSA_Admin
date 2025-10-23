import React, { useState } from 'react'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import Envelop from '../../public/icons/Envelop'
import Onboarding from '@/layout/Onboarding'

export default function Verify() {
    const router = useRouter()
    
    return (
      <Onboarding>
        <div className='w-full flex justify-center items-center'>
          <div className='mt-12 bg-white rounded-lg py-8 w-3/12 px-10 flex justify-center flex-wrap'>
            <span className='border border-green-light rounded-full bg-white flex items-center justify-center mb-4' style={{height:"60px", width:"60px"}}>
              <Envelop />
            </span>
            <h1 className="text-3xl font-semibold font-sans w-full text-center">Verify your link</h1>
            <h3 className='mt-4 mb-6 text-sm text-grey w-full font-inter font-normal text-center'>We have sent a verification link to your email. Please click on the link and come back to the app.</h3>
            <Button variant="green" onClick={() => router.push("/")}>Resend link</Button>
            <div className='my-4 w-full flex items-center justify-center'>
              <span className='text-sm font-semibold text-black'>Already Verify? </span>
              <span role='button' className='text-green text-sm font-semibold ml-1 hover:underline' onClick={()=>router.push("/")}>Go to login</span>
            </div>
          </div>
        </div>
      </Onboarding>
    )
}
