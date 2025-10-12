import Button from '@/components/Button'
import Input from '@/components/Input'
import Password from '@/components/Password'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import { isRequired } from '@/Utilities/helpers'
import Onboarding from '@/layout/Onboarding'
import Link from 'next/link'
import { loginAdmin } from '@/services/APIs/onBoarding'
import { setToken } from '@/services/firebase-services/cookies'
export default function Signin() {
    const router = useRouter();
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        if(isRequired(email, "Email") && isRequired(password,"Password")){
            setLoading(true);
            const response = await loginAdmin({email, password});
            if(response.status){
                const expiryTime = new Date(Date.now() + 3600 * 24 * 1000);
                const token = response.data.token;
                setToken(token, expiryTime);
                router.push("/dashboard");
            }
            else{
                setLoading(false);
            }
        }
    }
    return (
        <Onboarding>
            <form onSubmit={submitHandler} className='w-full flex justify-center items-center'>
                <div className='mt-12 bg-white rounded-lg py-8 w-1/3 px-10'>
                    <h4 className='font-semibold text-3xl text-black text-center font-sans'>Log In</h4>
                    <h5 className='font-normal text-grey text-sm font-sans mt-1 text-center'>Enter your details</h5>
                    <label className="flex flex-wrap mt-10">
                        <span className="w-full text-sm text-inputLabel font-medium mb-1">Email</span>
                        <Input type="email" name={"email"} placeholder="Enter email" invalidmessage="Please enter a valid email." />
                    </label>
                    <label className="flex flex-wrap mt-5">
                        <span className="w-full text-sm font-medium mb-1">Password</span>
                        <Password name={"password"} placeholder="Enter password"></Password>
                    </label>
                    <Link href="/forgot-password" className='w-full flex justify-end text-black text-xs mt-2 hover:underline'>Forgot Password?</Link>
                    {/* {(fields.validemail )? */}
                    <Button variant={"green"} className="mt-4" type="submit" loading={loading}>{loading?"Processing":"Continue"}</Button>                    {/* : */}
                    {/* // <Button variant={"disable-green"} className="mt-5 cursor-not-allowed" disabled={true}>Continue</Button>} */}
                </div>
            </form>
        </Onboarding>
    )
}
