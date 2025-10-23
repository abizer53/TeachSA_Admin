import Button from '@/components/Button'
import React,{useState} from 'react'
import SendMessageModal from '../SendMessagModal'
import DeclineModal from '../DeclineModal'
import VerifyConfirmationModal from '../VerifyConfirmationModal'
import BlockUnblockModal from '../BlockUnblockModal'
import LargeProfilePicModal from '../LargeProfilePicModal'

export default function UpperModule({data,type,refresh,loading,verify}) {
    const [messageModal,setMessageModal] = useState(false)
    const [rejectionModal,setRejectionModal] = useState(false)
    const [verifyModal,setVerifyModal] = useState(false)
    const [blockModal,setBlockModal] = useState(false)
    const blockModalHandler = () => {
        setBlockModal(!blockModal)
    }
    const rejectionModalHandler = () => {
        setRejectionModal(!rejectionModal)
    }
    const messageHandler = () => {
        setMessageModal(!messageModal)
    }
    const verifyModalHandler = () => {
        setVerifyModal(!verifyModal)
    }
    
    const [openModal,setOpenModal] = useState(false)
    const openModalHandler = () => setOpenModal(!openModal)
    return (
        <div className="w-full">
            {openModal && <LargeProfilePicModal source={type == 'seeker' ? data?.profile?.profile_photo : data?.upload_logo} handler={openModalHandler} />}
            <div className='w-full flex items-end justify-between -mt-8 z-10 relative'>
                <div className='flex items-center gap-6 px-5 w-1/2'>
                    <div className='relative z-10'>
                        {type == 'seeker' && <img onClick={openModalHandler} src={(data && data?.profile?.profile_photo)?data?.profile?.profile_photo:"/images/thumbnail.png"} className='size-28 rounded-full object-fill shadow border-4 border-white z-10' />}
                        {type == 'provider' && <img onClick={openModalHandler} src={(data && data?.upload_logo)?data?.upload_logo:"/images/thumbnail.png"} className='h-28 w-28 rounded-full object-cover shadow border-4 border-white z-10' />}
                        {(data?.profile?.profile_photo || data?.upload_logo) && <div onClick={openModalHandler} className='bottom-0 -right-2 cursor-pointer shadow bg-white rounded-full p-2 absolute'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                        </div>}
                    </div>
                    <div>
                        <h4 className='text-xl text-black font-semibold font-sans mt-4'>{type == 'seeker' ? data?.full_name : data?.company_name}</h4>
                        {type == 'seeker' && <h6 className='text-input-label font-normal text-base mb-3'>{data?.job_category}</h6>}
                    </div>
                </div>
                {!loading && <div className='flex items-center justify-end gap-5 mb-5 w-1/3'>
                    {data?.is_verify == 0 && <Button variant={"green"} onClick={verifyModalHandler} className="cursor-pointer capitalize max-w-40">Verify</Button>}
                    {/* <Button onClick={messageHandler} variant={"yellow"} className="cursor-pointer max-w-40">Message</Button> */}
                    {data?.is_verify == 0 && <Button variant={"danger"} onClick={rejectionModalHandler} className="cursor-pointer capitalize max-w-40">Decline</Button>}
                    {data?.is_verify == 1 && <h6 className="capitalize text-sm font-medium text-green">Verified</h6>}
                    {data?.is_verify == 2 && <h6 className="capitalize text-sm font-medium text-danger">Verification Declined</h6>}
                    {data?.is_verify == 3 && <h6 className="capitalize text-sm font-medium text-yellow cursor-pointer" onClick={verifyModalHandler}>Requested for Reverification</h6>}

                    {data?.is_verify == 1 && <Button variant={data?.is_block == '2' ? "green":"danger"} onClick={blockModalHandler} className="cursor-pointer max-w-40">{data?.is_block == 2 ? 'Unblock':"Block"}</Button>}
                </div>}
            </div>
            {data?.is_verify == 2 && <div className='bg-white p-5 rounded-lg mt-5'>
                <h5 className='text-base font-medium text-danger'>Verification Decline Reason By You</h5>
                <h6 className='text-base font-normal text-black'>{data?.decline_message}</h6>
            </div>}
            {data?.is_block == 2 && <div className='bg-white p-5 rounded-lg mt-5'>
                <h5 className='text-base font-medium text-danger'>Admin&apos;s Reason For Blocking Account -</h5>
                <h6 className='text-base font-normal text-black'>{data?.block_message}</h6>
            </div>}
            {messageModal && <SendMessageModal data={data} type={type}  handler={messageHandler} refresh={refresh} />}
            {rejectionModal && <DeclineModal data={data} type={type} handler={rejectionModalHandler} refresh={refresh} />}
            {verifyModal && <VerifyConfirmationModal data={data} type={type}  handler={verifyModalHandler} refresh={refresh} />}
            {blockModal && <BlockUnblockModal data={data} type={type}  handler={blockModalHandler} refresh={refresh} />}  
        </div>
    )
}
