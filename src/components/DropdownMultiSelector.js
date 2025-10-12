import React, { useState } from 'react'
import Cross from '../../public/icons/Cross'
export default function DropdownMultiSelector(props) {
  const [value,setValue] = useState([])
  const [show,setShow] = useState(false)
  const handler = (e) => {
    const val = e.currentTarget.getAttribute("value")
    setValue([...value,val])
    if(value.length == 0){
        setValue([val])
    }else{
        const filter = value.filter((item)=>item != val)
        setValue([...filter,val])
    }
  }
  const removeHandler = (e) => {
    const val = e.currentTarget.getAttribute("value")
    const filter = value.filter((item)=>item != val)
    setValue(filter)
  }
  return (
    <>
        <div onClick={()=>setShow(!show)} className={`w-full relative border border-solid border-border-input bg-white ${show ? 'rounded-sm' :'rounded-md'}`}>
            <h5 className={`text-sm px-3 py-2.5 font-normal w-full cursor-text text-placeholder`}>{props.placeholder}</h5>
            {show && <div className='border bg-white border-solid border-border-input rounded-sm absolute w-full left-0 top-12 max-h-[180px] overflow-y-auto z-50'>
                {props.data?.map((item,index)=><h5 key={index} value={item.value} onClick={handler} className='text-sm font-normal text-black px-4 py-2 hover:bg-green-light hover:text- cursor-pointer'>{item.value}</h5>)}
            </div>}
        </div>
        {value.length > 0 && <div className='w-full flex flex-wrap gap-2 mt-3'>
            {value?.map((item,index)=><div key={index} className='flex dropdown items-center gap-2 px-3 py-1 border border-border-input rounded-md'>
                <h6 className='text-sm text-black font-normal'>{item}</h6>
                <div onClick={removeHandler} value={item} className='border-danger border cursor-pointer size-4 flex items-center justify-center rounded-full'>
                    <Cross/>
                </div>
            </div>)}
        </div>}
    </>
  )
}
