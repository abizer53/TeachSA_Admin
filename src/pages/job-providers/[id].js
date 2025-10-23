import React, { useEffect, useState } from 'react'
import Personal from '@/modules/profile/Personal'
import Documents from '@/modules/profile/Documents'
import Layout from '@/layout/Layout'
import CompanyDetail from '@/modules/profile/CompanyDetail'
import Google from '../../../public/icons/Google'
import { useRouter } from 'next/router'
import { getSingleProvider } from '@/services/APIs/users'
import Loader from '@/modules/Loader'
import Button from '@/components/Button'
import Download from '../../../public/icons/Download'
import File from '../../../public/icons/File'
import BlockUnblockModal from '@/modules/BlockUnblockModal'
import VerifyConfirmationModal from '@/modules/VerifyConfirmationModal'
import UpperModule from '@/modules/profile/UpperModule'
import UploadedDocument from '@/modules/profile/UploadedDocument'
import LargePhotoModal from '@/modules/LargePhotoModal'

export default function Profile() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [messageModal,setMessageModal] = useState(false)
    const [blockModal,setBlockModal] = useState(false)
    const [verifyModal,setVerifyModal] = useState(false)

    const blockModalHandler = () => {
        setBlockModal(!blockModal)
    }
    const messageHandler = () => {
        setMessageModal(!messageModal)
    }
    const verifyModalHandler = () => {
        setVerifyModal(!verifyModal)
    }
    const dataSetter = async () => {
        setLoading(true);
        const response = await getSingleProvider(router.query.id)
        if(response.status){
            setData(response.data);
            setLoading(false);
        }else{
            setLoading(false)
        }
    }
    useEffect(()=>{
        dataSetter()
    },[])
    const [openModal,setOpenModal] = useState(false)
    const openModalHandler = () => setOpenModal(!openModal)
    return (
        <Layout>
            {!loading && data && <div className='w-full relative'>
                <img src={data?.cover_photo ? data?.cover_photo : '/images/thumbnail.png'} className={`w-full h-60 object-cover  z-10 rounded-lg`}></img>
                <p onClick={openModalHandler} className='text-xs z-20 font-normal cursor-pointer w-fit absolute bottom-2.5 right-3 bg-zinc-200 py-1 px-2 rounded-lg'>View Large</p>
            </div>}
            {openModal && <LargePhotoModal source={data?.cover_photo ? data?.cover_photo : '/images/thumbnail.png'} handler={openModalHandler} />}
        
            {loading && <Loader/>}
            {!loading && <section className='container'>
                {data && <UpperModule data={data} type='provider' loading={loading} refresh={dataSetter} />}

                {!loading && <div className="w-full">
                    <div className='w-full grid grid-cols-2 gap-8 my-8'>
                        <Personal type="provider" data={data} />
                        <CompanyDetail data={data} />
                    </div>
                    <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg my-8'>
                        <div className='flex items-center justify-between w-full'>
                            <h4 className='text-black font-sans text-2xl font-semibold'>Documents Uploaded</h4>
                        </div>
                        <div className='w-full grid grid-cols-3 gap-8 mt-5'>
                            {data?.upload_company_registration && <UploadedDocument title="Company Registration" url={data?.upload_company_registration}/>}
                        </div>
                    </div>
                </div>}
                {loading && <div className="w-full p-5 mt-5">
                    <Loader/>
                </div>}
            </section>}
        </Layout>

    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}