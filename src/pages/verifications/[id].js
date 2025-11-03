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
import { getSingleVerification } from '@/services/APIs/verifications'
import { useSearchParams } from 'next/navigation'
import { getSingleProvider, getSingleSeeker } from '@/services/APIs/users'
import File from '../../../public/icons/File'
import DeclineModal from '@/modules/DeclineModal'
import VerifyConfirmationModal from '@/modules/VerifyConfirmationModal'
import BlockUnblockModal from '@/modules/BlockUnblockModal'
import UploadedDocument from '@/modules/profile/UploadedDocument'
import Loader from '@/modules/Loader'
import UpperModule from '@/modules/profile/UpperModule'
import LargePhotoModal from '@/modules/LargePhotoModal'

export default function Profile() {
    const router = useRouter()
    const params = useSearchParams()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const dataSetter = async () => {
        if(params.get("type") == 'seeker'){
            setLoading(true);
            const response = await getSingleSeeker(router.query.id)
            if(response.status){
                setData(response.data);
                setLoading(false);
            }else{
                setLoading(false)
            }
        }else{
            setLoading(true);
            const response = await getSingleProvider(router.query.id)
            if(response.status){
                setData(response.data);
                setLoading(false);
            }else{
                setLoading(false)
            }
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
                <img src={router.query.type == 'provider' ? data?.cover_photo ? data?.cover_photo : '/images/pbanner.webp' : data?.profile?.cover_photo ? data?.profile?.cover_photo : '/images/banner.webp'} className={`w-full h-60 object-cover z-10 rounded-lg`}></img>
                <p onClick={openModalHandler} className='text-xs z-20 font-normal cursor-pointer w-fit absolute bottom-2.5 right-3 bg-zinc-200 py-1 px-2 rounded-lg'>View Large</p>
            </div>}
            {openModal && <LargePhotoModal source={router.query.type == 'provider' ? data?.cover_photo ? data?.cover_photo : '/images/thumbnail.png' : data?.profile?.cover_photo ? data?.profile?.cover_photo : '/images/thumbnail.png'} handler={openModalHandler} />}
        
            <section className='container'>
                {!loading && data && <UpperModule verify={true} data={data} type={router.query.type} loading={loading} refresh={dataSetter} />}
                {!loading && <div className="w-full">
                    <div className='w-full grid grid-cols-2 gap-8 my-8'>
                        {data && <Personal data={data} type={router.query.type} />}
                        {router.query.type == 'provider' ? <CompanyDetail data={data} />:<Residential data={data?.profile} />}
                    </div>
                    {router.query.type == 'seeker' && <WorkDetail data={data?.experience} />}
                    {router.query.type == 'seeker' && <Preferred data={data?.profile} />}
                    <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg my-8'>
                        <div className='flex items-center justify-between w-full'>
                            <h4 className='text-black font-sans text-xl font-semibold'>Documents Uploaded</h4>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-10 mt-5">
                            {data?.resume && <UploadedDocument title={data?.resume?.title} url={data?.resume?.document}/>}
                            {data?.document?.length > 0 && data?.document?.map((item,index)=><UploadedDocument key={index} title={item.title} url={item.document} />)}
                            {data?.upload_company_registration && <UploadedDocument title="Company Registration" url={data?.upload_company_registration} />}
                            {data?.profile?.upload_certificates && <UploadedDocument title="Certficates" url={data?.profile?.upload_certificates} />}
                            {data?.profile?.upload_reference_letters && <UploadedDocument title="Reference Letter" url={data?.profile?.upload_reference_letters}/>}
                            {data?.document?.map((item,index)=><UploadedDocument key={index} title={item.title} url={item.document} />)}
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