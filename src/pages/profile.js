import React, { useState } from 'react'
import Personal from '@/modules/profile/Personal'
import Documents from '@/modules/profile/Documents'
import Layout from '@/layout/Layout'
import CompanyDetail from '@/modules/profile/CompanyDetail'
import Google from '../../public/icons/Google'

export default function Profile() {
    const [banner,setBanner] = useState('')
    const [dp,setDp] = useState('')
    const dpHandler = (val) => {
        setDp(URL.createObjectURL(val))
    }
    const bannerHandler = (val) => {
        setBanner(URL.createObjectURL(val))
    }
    const [messageModal,setMessageModal] = useState(false)
    const messageHandler = () => {
        setMessageModal(!messageModal)
    }
    return (
        <Layout>
            <section className={`w-full py-24 bg-cover flex flex-wrap justify-center z-10`} style={{backgroundImage:`${banner != '' ? `url('${banner}')` : "url('/images/thumbnail.png')"}`}}></section>
            <section className='container'>
                <div className='w-full flex items-end justify-between -mt-8 z-40 relative'>
                    <div className='flex items-end gap-6 px-5'>
                        <div className='bg-white size-28 rounded-full relative flex items-center justify-center'>
                            <Google/>
                        </div>
                        <div>
                            <h4 className='text-xl text-black font-semibold font-sans'>Mr. Calvin Carlo</h4>
                            <h6 className='text-input-label font-normal text-base mb-3'>Google Employer</h6>
                        </div>
                    </div>
                </div>
                <div className='w-full grid grid-cols-2 gap-8 my-8'>
                    {/* <Personal/>
                    <CompanyDetail/> */}
                </div>
                {/* <Documents/> */}
            </section>
        </Layout>

    )
}
