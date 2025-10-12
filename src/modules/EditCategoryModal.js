
import React, { useState } from 'react'
import CrossCircle from '../../public/icons/CrossCircle'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { categoryChecker, isRequired } from '@/Utilities/helpers'
import { updateCategory } from '@/services/APIs/categories'

export default function EditCategoryModal(props) {
    const [type,setType] = useState(props.data.type)
    const [loading,setLoading] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const name = formData.get("name");
        if(categoryChecker(name,"Category name") && isRequired(type,"Category type")){
            setLoading(true)
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("type", type);
            const response = await updateCategory(formdata,props.data.id)
            if(response?.status){
                props.refresh('')
                props.handler()
            }else{
                setLoading(false)
            }
        }
    }
    return (
        <div className='modal-container'>
            <form onSubmit={submitHandler} className='bg-white rounded-lg p-8 w-1/3 max-h-[95vh] overflow-y-auto dropdown'>
                <div className='flex items-center justify-between'>
                    <h4 className='text-black font-sans text-2xl font-semibold'>Edit Category</h4>
                    <div onClick={props.handler} className='cursor-pointer'>
                        <CrossCircle/>
                    </div>
                </div>
                
                <label className="flex flex-wrap mt-10">
                    <span className="w-full text-sm text-inputLabel font-medium mb-1">Name<span className='text-danger'>*</span></span>
                    <Input type="text" name="name" defaultValue={props.data.name} placeholder="Enter category name" invalidmessage="Please enter a category name" />
                </label>
                <label className="w-full text-sm font-medium mb-1 flex mt-4">Type<span className='text-danger'>*</span></label>
                    <div className='flex items-center gap-6 mt-3'>
                        <label htmlFor='yes' className='flex items-center gap-2 cursor-pointer'>
                            {type == 'teaching' ? <input type="radio" checked name="needed" id="yes" className='size-4 accent-green' onChange={()=>setType("teaching")} />
                            :<input type="radio" name="needed" id="yes" className='size-4 accent-green' onChange={()=>setType("teaching")} />}
                            <h6 className='text-grey text-sm font-normal'>Teaching</h6>
                        </label>
                        <label htmlFor='no' className='flex items-center gap-2 cursor-pointer'>
                            {type == 'non-teaching' ? <input type="radio" checked name="needed" id="no" className='size-4 accent-green' onChange={()=>setType("nonTeaching")}/>
                            :<input type="radio" name="needed" id="no" className='size-4 accent-green' onChange={()=>setType("non-teaching")}/>}
                            <h6 className='text-grey text-sm font-normal'>Non-teaching</h6>
                        </label>
                    </div>
                <div className={`w-full grid grid-cols-2 gap-5 mt-3`}>
                    <Button variant={"green-with-border"} className="mt-6 cursor-pointer" onClick={props.handler}>Cancel</Button>
                    <Button variant={"green"} loading={loading} className="mt-6 cursor-pointer">Update</Button>
                </div> 
            </form>
        </div>
    )
}
