import React from 'react'

export default function JobTypeModal(props) {
    const handler = (e) => {
        props.handler('status',e.currentTarget.getAttribute("value"))
    }
  return (
    <div className='w-36 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] left-0 z-20'>
        <label htmlFor='Boosted Jobs' className='w-full flex items-center gap-2 cursor-pointer' value="1" onClick={handler}>
            {props.value == '1' ? <input type="radio" name="status" id="Boosted Jobs" value="Boosted Jobs" checked />:<input type="radio" name="status" id="Boosted Jobs" value="Boosted Jobs" />}
            <h6 className='text-xs text-black font-normal'>Boosted Jobs</h6>
        </label>
        <label htmlFor='Regular Jobs' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="0" onClick={handler}>
            {props.value == '0' ? <input type="radio" name="status" id="Regular Jobs" value="Regular Jobs" checked />:<input type="radio" name="status" id="Regular Jobs" value="Regular Jobs" />}
            <h6 className='text-xs text-black font-normal'>Regular Jobs</h6>
        </label>
        <label htmlFor='all' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="" onClick={handler}>
            {props.value == 'all' ? <input type="radio" name="status" id="all" value="all" checked />:<input type="radio" name="status" id="all" value="all" />}
            <h6 className='text-xs text-black font-normal'>All</h6>
        </label>
    </div>
  )
}
