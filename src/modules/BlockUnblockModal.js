import Button from '@/components/Button'
import { changeStatusOfEmployer, changeStatusOfUser } from '@/services/APIs/verifications'
import { infoMessage } from '@/Utilities/toasters'
import React, { useState } from 'react'

export default function BlockUnblockModal({type,data,handler,refresh}) {
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState('')
    const yesHandler = async () => {
        setLoading(true)
        if(type == 'seeker'){
            if(data?.is_block == '1' || data?.is_block == '0'){
                if(message.trim().length > 5){
                    const formdata = new FormData();
                    formdata.append("status", "2");
                    formdata.append("block_message",message)
                    const response = await changeStatusOfUser(data.id,formdata)
                    if(response?.status){
                        refresh()
                        handler()
                    }
                }else{
                    infoMessage("Add reason for blocking")
                }
                
            }else{
                const formdata = new FormData();
                formdata.append("status", "1");
                formdata.append("block_message",null)
                const response = await changeStatusOfUser(data.id,formdata)
                if(response?.status){
                    refresh()
                    handler()
                }
            }          
        }else{
            if(data?.is_block == '1' || data?.is_block == '0'){
                if(message.trim().length > 5){
                    const formdata = new FormData();
                    formdata.append("status", "2");
                    formdata.append("block_message",message)
                    const response = await changeStatusOfEmployer(data.id,formdata)
                    if(response?.status){
                        refresh()
                        handler()
                    }
                }else{
                    infoMessage("Add reason for blocking")
                }
            }else{
                const formdata = new FormData();
                formdata.append("status", "1");
                formdata.append("block_message",null)
                const response = await changeStatusOfEmployer(data.id,formdata)
                if(response?.status){
                    refresh()
                    handler()
                }
            }   
        }
        setLoading(false)
    }
    return (
        <div className='modal-container'>
            <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
            <h2 className='font-sora text-2xl text-center w-full font-semibold'>
                Are you sure you want to {data?.is_block == '2' ? 'Unblock':'block'} {type}?
            </h2>
            {data?.is_block != '2' && <label className="w-full text-sm font-medium flex mb-1 mt-6">Reason<span className="text-danger">*</span></label>}
            {data?.is_block != '2' && <textarea rows={7} value={message} onChange={e=>setMessage(e.target.value)} className='w-full resize-none font-inter rounded-lg border border-solid border-border-input px-3 py-2.5 font-normal text-sm text-black placeholder-shown:text-placeholder focus:outline-none focus:border-2' placeholder="Enter reason of blocking" name="name"/>}
            <div className='w-full grid grid-cols-2 mt-5 gap-3'>
                <Button variant="normal" onClick={handler}>No</Button>
                <Button variant={data?.is_block == '2' ? "green":"danger"} loading={loading} onClick={yesHandler}>Yes</Button>
            </div>
            </div>
        </div>
    )
}
