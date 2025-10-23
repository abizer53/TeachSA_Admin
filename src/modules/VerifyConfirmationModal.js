import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import InputDropdownMulti from '@/components/InputDropdownMulti'
import { getAllCategories } from '@/services/APIs/categories'
import { verifyToggleEmployer, verifyToggleUser } from '@/services/APIs/verifications'
import Grades from '@/Utilities/grades'
import { isRequired, isRequiredStringArray } from '@/Utilities/helpers'
import Subjects from '@/Utilities/subjects'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Copy from '../../public/icons/Copy'
import { infoMessage } from '@/Utilities/toasters'

export default function VerifyConfirmationModal({type,data,handler,refresh}) {
    const [loading,setLoading] = useState(false)
    const [dataNew,setData] = useState([])
    const [verified,setVerified] = useState('')
    const [isCopy,setIsCopy] = useState(false)
    const [preferredPositions,setPreferredPositions] = useState({
        preferred_positions:'',
        preferred_grade:'',
        preferred_subjects:'',
        preferred_categories:''
    })
    const verifiedData = [
        {id:1,value:"Yes"},
        {id:2,value:"No"}
    ]
    const dataSetter = async (query) => {
        const response = await getAllCategories('?per_page=100')
        if(response.status){
            const temp = []
            response.data.data.map((item)=>{
                const obj = {
                    id:item?._id,
                    value:item?.name
                }
                temp.push(obj)
            })
          setData(temp)
        }
    }
    const yesHandler = async () => {
        if(type == 'seeker'){
            if(isRequiredStringArray(preferredPositions.preferred_positions,"Final position") && isRequired(verified,"Sace ID verification status")){
                setLoading(true)
                const formdata = new FormData();
                formdata.append("status", "1");
                formdata.append("decline_message",null)
                formdata.append("sace_id_verification", verified == 'Yes' ? 1 : 0);
                formdata.append("final_position", preferredPositions.preferred_positions);
                formdata.append("final_subjects", preferredPositions.preferred_subjects);
                formdata.append("final_grade", preferredPositions.preferred_grade);
                const response = await verifyToggleUser(data.id,formdata)
                if(response?.status){
                    refresh()
                    handler()
                }
            }
        }else{
            if(isRequiredStringArray(preferredPositions.preferred_categories,"Final categories")){
                setLoading(true)
                const formdata = new FormData();
                formdata.append("job_category", preferredPositions.preferred_categories);
                formdata.append("status", "1");
                formdata.append("decline_message",null)
                const response = await verifyToggleEmployer(data.id,formdata)
                if(response?.status){
                    refresh()
                    handler()
                }
            }
        }
        setLoading(false)
    }
    const copyIDNumber = () => {
        const value = data?.profile?.ID_number
        if (value) {
            navigator.clipboard
            .writeText(value.toString())
            .then(() => {
                setIsCopy(true); // update state
                console.log("Copied:", value);
            })
            .catch((err) => {
                console.error("Failed to copy:", err);
            });
        } else {
            infoMessage("SA ID not added");
        }
    }



    useEffect(()=>{
        // if(type == 'seeker'){
            dataSetter()
        // }
    },[])
    return (
        <div className='modal-container'>
            <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
                <h2 className='font-sora text-2xl text-center w-full font-semibold'>
                    Are you sure you want to verify {type}?
                </h2>
                {type == 'seeker' && <div className='w-full'>
                    <>
                        <label className="w-full text-sm font-medium mb-1 mt-4 flex">Final Position</label>
                        <InputDropdownMulti placeholder="Select position" classes="border rounded-md" data={dataNew} 
                        handler={(val)=>{setPreferredPositions((prev)=>({...prev, preferred_positions:val }))}} />
                    </>
                    <>
                        <label className="w-full text-sm font-medium mb-1 mt-4 flex">Final Grade(s) / Level(s)</label>
                        <InputDropdownMulti classes="border rounded-md" data={Grades()} placeholder="Search position"
                            handler={(val)=>{setPreferredPositions((prev)=>({...prev, preferred_grade:val }))}} 
                            />
                    </>
                    <>
                        <label className="w-full text-sm font-medium mb-1 mt-4 flex">Final Subjects</label>
                        <InputDropdownMulti classes="border rounded-md" data={Subjects()} placeholder="Search position"
                            handler={(val)=>{setPreferredPositions((prev)=>({...prev, preferred_subjects:val }))}} 
                        />
                    </>
                    <>
                        <div className='flex items-center w-full justify-between mb-1 mt-4'>
                            <div>
                                <label className="text-sm font-medium flex">SA ID</label>
                                <Link href='https://www.sace.org.za/' target='_blank' rel="noreferrer" className='text-green font-normal text-xs underline'>Check Sace ID</Link>
                            </div>
                            <div onClick={copyIDNumber} className='border rounded-lg px-2 py-2.5 cursor-pointer flex items-center gap-2'>
                                <p className='text-sm text-grey'>{data?.profile?.ID_number ? isCopy ? 'Copied':"Copy" : ''} {data?.profile?.ID_number || "SA ID not added"} </p>
                                <Copy/>
                            </div>
                        </div>
                    </>
                    <>
                        <div className='flex items-center w-full justify-between mb-1 mt-4'>
                            <label className="text-sm font-medium flex">Sace ID Verified</label>
                        </div>
                        <Dropdown classes="border rounded-md" data={verifiedData} placeholder="Select sace ID status"
                            handler={(val)=>setVerified(val)} 
                        />
                    </>
                </div>}
                {type == 'provider' && <div className='w-full'>
                    
                        <label className="w-full text-sm font-medium mb-1 mt-4 flex">Final Categories</label>
                        <InputDropdownMulti placeholder="Select categories" classes="border rounded-md" data={dataNew} 
                        handler={(val)=>{setPreferredPositions((prev)=>({...prev, preferred_categories:val }))}} />
                </div>}
                <div className='w-full grid grid-cols-2 mt-5 gap-3'>
                    <Button variant="normal" onClick={handler}>No</Button>
                    <Button variant="green" loading={loading} onClick={yesHandler}>Yes</Button>
                </div>
            </div>
        </div>
    )
}
