import React, { useState } from 'react'
import Edit from '../../public/icons/Edit'
import Delete from '../../public/icons/Delete'
import DeleteModal from './DeleteModal'
import EditCategoryModal from './EditCategoryModal'
import { deleteCategory, updateCategoryStatus } from '@/services/APIs/categories'
import ToggleIcon from './ToggleIcon'

export default function SingleCategory({data,refresh}) {
    const [createModal,setCreateModal] = useState(false)
    const [editModal,setEditModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [checked,setChecked] = useState(data?.status == '0' ? true : false)
    const createHandler = () => {
        setCreateModal(!createModal)
    }
    const editHandler = () => {
        setEditModal(!editModal)
    }
    const deleteApiHandler = async () => {
        setLoading(true)
        const response = await deleteCategory(data.id)
        if(response.status){
            refresh('')
            createHandler()
        }else{
            setLoading(false)
        }
    }
    const statusApiHandler = async () => {
        setLoading(true)
        setChecked(!checked)
        const formdata = new FormData();
        formdata.append("status", data?.status == 0 ? 1 : 0);
        const response = await updateCategoryStatus(formdata,data.id)
        if(response.status){
            refresh('')
        }else{
            setLoading(false)
        }
    }

    return (
        <div className='w-full bg-white border-b border-border-nput flex items-center justify-between px-5 py-4'>
            <h6 className='text-sm font-normal text-black w-1/4 capitalize'>{data?.name}</h6>
            <h6 className='text-sm font-normal text-black w-1/4 text-center capitalize'>{data.type}</h6>
            <div className="flex items-center justify-center w-1/4 gap-2">
                <ToggleIcon isChecked={checked} handler={statusApiHandler} />
                {checked && <h6 className='text-sm font-normal text-danger'>Inactive</h6>}
                {!checked && <h6 className='text-sm font-normal text-green'>Active</h6>}
                
            </div>
            
            <div className='flex items-center justify-center gap-5 w-1/4'>
                <div onClick={editHandler} className='cursor-pointer'>
                    <Edit/>
                </div>
                <div onClick={createHandler} className='cursor-pointer'>
                    <Delete/>
                </div>
            </div>
            {createModal && <DeleteModal loading={loading} deleteHandler={deleteApiHandler} handler={createHandler} />}
            {editModal && <EditCategoryModal data={data} refresh={refresh} handler={editHandler} />}
        </div>
    )
}
