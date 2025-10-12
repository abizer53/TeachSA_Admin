import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Onboarding from '@/layout/Onboarding'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function ForgotPassword() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    // const { forgotPassword } = useFirebaseAuth()
    const [loading, setLoading] = useState(false)
    const focusHandler = (e) => {
        setEmail(e.target.value);
    }

    const handler = async () => {
        // setLoading(true)
        // const res = await forgotPassword(email)
        // router.push("/email-sent")
    }
    return (
        <Onboarding>
            <div className='w-full flex justify-center items-center'>
                <div className='mt-12 bg-white rounded-lg py-8 w-1/3 px-10'>
                    <h1 className="text-3xl font-semibold font-sans w-full text-center mb-2">Forgot password</h1>
                    <h3 className='pb-4 text-sm text-grey w-full font-inter font-normal text-center'>We&apos;ll send instructions to the below email</h3>
                    <div className='mt-6'>
                        <label className="flex flex-wrap">
                            <span className="w-full text-sm text-inputLabel font-medium mb-1">Email address</span>
                            <Input type="email" placeholder="Enter email" invalidmessage="Please enter a valid email." onChange={focusHandler} />
                        </label>

                        <Button variant="green" className="mb-8 mt-6" onClick={() => router.push("/email-sent")}>Send Instructions </Button>
                    </div>
                </div>
            </div>
        </Onboarding>
    )
}
