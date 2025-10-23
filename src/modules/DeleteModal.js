import Button from '@/components/Button'
import React from 'react'

export default function DeleteModal({handler,deleteHandler,loading}) {
    return (
        <div className='modal-container'>
            <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
            <h2 className='font-sora text-2xl text-center w-full font-semibold'>
                Are you sure you want to delete?
            </h2>
            <h3 className='w-full text-sm text-center my-3 text-neutral-700 font-sora'>
                By clicking on Yes the current category will be permanently deleted.
            </h3>
            <div className='w-full grid grid-cols-2 mt-5 gap-3'>
                <Button variant="normal" onClick={handler}>No</Button>
                <Button variant="danger" loading={loading} onClick={deleteHandler}>Yes</Button>
            </div>
            </div>
        </div>
    )
}
