import React, { useEffect, useState } from 'react'
import Personal from '@/modules/profile/Personal'
import Residential from '@/modules/profile/Residential'
import WorkDetail from '@/modules/profile/WorkDetail'
import Preferred from '@/modules/profile/Preferred'
import Documents from '@/modules/profile/Documents'
import Layout from '@/layout/Layout'
import Button from '@/components/Button'
import SendMessageModal from '@/modules/SendMessagModal'
import { useRouter } from 'next/router'
import CompanyDetail from '@/modules/profile/CompanyDetail'
import { getSingleSeeker } from '@/services/APIs/users'
import BlockUnblockModal from '@/modules/BlockUnblockModal'
import File from '../../../public/icons/File'
import UploadedDocument from '@/modules/profile/UploadedDocument'
import VerifyConfirmationModal from '@/modules/VerifyConfirmationModal'
import Loader from '@/modules/Loader'
import UpperModule from '@/modules/profile/UpperModule'

export default function Profile() {
    const router = useRouter()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
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
        const response = await getSingleSeeker(router.query.id)
        if(response.status){
            setData(response.data);
            setLoading(false);
        }
    }
    useEffect(()=>{
        dataSetter()
    },[])
  
    return (
        <Layout>
            {!loading && data && <img src={data?.profile?.cover_photo ? data?.profile?.cover_photo : '/images/thumbnail.png'} className={`w-full h-60 object-cover  z-10 rounded-lg`}></img>}
            <section className='container'>
                {!loading && data && <UpperModule data={data} type='seeker' loading={loading} refresh={dataSetter} />}
                {!loading && <div className="w-full">
                    <div className='w-full grid grid-cols-2 gap-8 my-8'>
                        <Personal data={data} type="seeker" />
                        <Residential data={data?.profile} />
                    </div>
                    <WorkDetail data={data?.experience} />
                    <Preferred data={data?.profile} verified={data?.is_verify == 1 ? true : false} refresh={dataSetter}  />
                    <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg my-8'>
                        <div className='flex items-center justify-between w-full'>
                            <h4 className='text-black font-sans text-xl font-semibold'>Documents Uploaded</h4>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-10 mt-5">
                            {data?.resume && <UploadedDocument title={data?.resume?.title} url={data?.resume?.document}/>}
                            {data?.document?.length > 0 && data?.document?.map((item,index)=><UploadedDocument key={index} title={item.title} url={item.document} />)}
                            {data?.profile?.upload_reference_letters && <UploadedDocument title="Reference Letter" url={data?.profile?.upload_reference_letters}/>}
                        </div>
                    </div>
                </div>}
                {loading && <div className="w-full p-5 mt-5">
                    <Loader/>
                </div>}
            </section>
        </Layout>

    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}