import React from 'react'

export default function VerifyFilterModal(props) {
    const handler = (e) => {
        props.handler('userType',e.currentTarget.getAttribute("value"))
    }
    return (
        <div className='w-32 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] left-0'>
            {/* <h5 className='text-black text-sm font-semibold mb-4'>Profile type</h5> */}
            <label htmlFor='seeker' className='w-full flex items-center gap-2 cursor-pointer' value="seeker" onClick={handler}>
                {props.value == 'seeker' ? <input type="radio" name="status" id="seeker" value="seeker" checked />:<input type="radio" name="status" id="seeker" value="seeker" />}
                <h6 className='text-xs text-black font-normal'>Seeker</h6>
            </label>
            <label htmlFor='provider' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="provider" onClick={handler}>
                {props.value == 'provider' ? <input type="radio" name="status" id="provider" value="provider" checked />:<input type="radio" name="status" id="provider" value="provider" />}
                <h6 className='text-xs text-black font-normal'>Provider</h6>
            </label>
            <label htmlFor='both' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="both" onClick={handler}>
                {props.value == 'both' ? <input type="radio" name="status" id="both" value="provider" checked />:<input type="radio" name="status" id="both" value="provider" />}
                <h6 className='text-xs text-black font-normal'>Both</h6>
            </label>
        </div>
    )
}
