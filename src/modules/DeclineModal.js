
import React, { useState } from 'react'
import CrossCircle from '../../public/icons/CrossCircle'
import Button from '@/components/Button'
import { verifyToggleEmployer, verifyToggleUser } from '@/services/APIs/verifications'
import { info } from 'autoprefixer'
import { infoMessage } from '@/Utilities/toasters'

export default function DeclineModal(props) {
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState('')
    const yesHandler = async () => {
        setLoading(true)
        if(props.type == 'seeker' && message.trim().length > 5){
            const formdata = new FormData();
            formdata.append("status", "2");
            formdata.append("decline_message",message)
            const response = await verifyToggleUser(props.data.id,formdata)
            if(response?.status){
                props.refresh()
                props.handler()
            }
        }else if(props.type == 'provider' && message.trim().length > 5){
            const formdata = new FormData();
            formdata.append("status", "2");
            formdata.append("decline_message",message)
            const response = await verifyToggleEmployer(props.data.id,formdata)
            if(response?.status){
                props.refresh()
                props.handler()
            }
        }else{
            infoMessage("Add decline reason")
        }
        setLoading(false)
    }
    return (
        <div className='modal-container'>
            <div className='bg-white rounded-lg p-8 w-1/3 max-h-[95vh] overflow-y-auto dropdown'>
                <div className='flex items-center justify-between'>
                    <h4 className='text-black font-sans text-2xl font-semibold capitalize'>Decline {props.type}</h4>
                    <div onClick={props.handler} className='cursor-pointer'>
                        <CrossCircle/>
                    </div>
                </div>
                
                <>
                    <label className="w-full text-sm font-medium flex mb-1 mt-6">Reason<span className="text-danger">*</span></label>
                    <textarea rows={7} value={message} onChange={e=>setMessage(e.target.value)} className='w-full resize-none font-inter rounded-lg border border-solid border-border-input px-3 py-2.5 font-normal text-sm text-black placeholder-shown:text-placeholder focus:outline-none focus:border-2' placeholder="Add reason for decline" name="name"/>
                </>
                <div className={`w-full grid grid-cols-2 gap-5`}>
                    <Button variant={"normal"} className="mt-6 cursor-pointer" onClick={props.handler}>Cancel</Button>
                    <Button variant={"danger"} loading={loading} className="mt-6 cursor-pointer" onClick={yesHandler}>Send</Button>
                </div> 
            </div>
        </div>
    )
}
