import Button from '@/components/Button'
import InputDropdownMulti from '@/components/InputDropdownMulti'
import { getAllCategories } from '@/services/APIs/categories'
import { verifyToggleEmployer, verifyToggleUser } from '@/services/APIs/verifications'
import Grades from '@/Utilities/grades'
import { isRequired, isRequiredStringArray } from '@/Utilities/helpers'
import Subjects from '@/Utilities/subjects'
import React, { useEffect, useState } from 'react'

export default function EditFinalPositionsModal({type,data,handler,refresh}) {
    const [loading,setLoading] = useState(false)
    const [dataNew,setData] = useState([])
    const [preferredPositions,setPreferredPositions] = useState(null)
    const dataSetter = async (query) => {
        const response = await getAllCategories('?limit=100')
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
        if(isRequiredStringArray(preferredPositions.preferred_positions,"Final position") && isRequiredStringArray(preferredPositions.preferred_grade,"Final grade") && isRequiredStringArray(preferredPositions.preferred_subjects,"Final subjects")){
            setLoading(true)
            const formdata = new FormData();
            formdata.append("status", "1");
            formdata.append("final_position", preferredPositions.preferred_positions);
            formdata.append("final_subjects", preferredPositions.preferred_subjects);
            formdata.append("final_grade", preferredPositions.preferred_grade);
            const response = await verifyToggleUser(data.id,formdata)
            if(response?.status){
                refresh()
                handler()
            }
            setLoading(false)
        } 
    }
    useEffect(()=>{
        dataSetter()
        setPreferredPositions({
            preferred_positions:data?.final_position,
            preferred_grade:data?.final_grade,
            preferred_subjects:data?.final_subjects,
        })
    },[])
    return (
        <div className='modal-container'>
            <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
                <h2 className='font-sora text-2xl text-center w-full font-semibold'>
                    Edit Final Positions
                </h2>
                {preferredPositions && <div className='w-full'>
                    <>
                        <label className="w-full text-sm font-medium mb-1 mt-4 flex">Final Position</label>
                        <InputDropdownMulti defaultValue={preferredPositions.preferred_positions} placeholder="Select position" classes="border rounded-md" data={dataNew} 
                        handler={(val)=>{setPreferredPositions((prev)=>({...prev, preferred_positions:val }))}} />
                    </>
                    <>
                        <label className="w-full text-sm font-medium mb-1 mt-4 flex">Final Grade(s) / Level(s)</label>
                        <InputDropdownMulti defaultValue={preferredPositions.preferred_grade} classes="border rounded-md" data={Grades()} placeholder="Search position"
                            handler={(val)=>{setPreferredPositions((prev)=>({...prev, preferred_grade:val }))}} 
                            />
                    </>
                    <>
                        <label className="w-full text-sm font-medium mb-1 mt-4 flex">Final Subjects</label>
                        <InputDropdownMulti defaultValue={preferredPositions.preferred_subjects} classes="border rounded-md" data={Subjects()} placeholder="Search position"
                            handler={(val)=>{setPreferredPositions((prev)=>({...prev, preferred_subjects:val }))}} 
                        />
                    </>
                </div>}
                <div className='w-full grid grid-cols-2 mt-5 gap-3'>
                    <Button variant="normal" onClick={handler}>No</Button>
                    <Button variant="green" loading={loading} onClick={yesHandler}>Yes</Button>
                </div>
            </div>
        </div>
    )
}
