import React, { useState } from 'react'
import EditFinalPositionsModal from '../EditFinalPositions'

export default function Preferred({data,verified, refresh}) {
    const [modal,setModal] = useState(false)
    const modalhandler = () => setModal(!modal)

    return (
        <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg my-8'>
            {modal && <EditFinalPositionsModal data={data} handler={modalhandler} refresh={refresh} />}
            <div className='w-full flex items-center justify-between'>
                <h4 className='text-black font-sans text-xl font-semibold'>Preferred Details</h4>
                {verified && <p onClick={modalhandler} className='text-sm cursor-pointer font-normal bg-yellow text-black rounded-full px-5 py-2'>Edit Final Positions</p>}
            </div>
            <div className='w-full flex items-center mt-6'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Preferred Positions</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.preferred_positions ? data?.preferred_positions : 'N/A'} {data?.final_position && <span className='text-grey font-bold'> -- Final Position: </span>}{data?.final_position && <span className='text-green font-bold'>{data?.final_position}</span>}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Preferred Grade(s) / Level(s)</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.preferred_grade ? data?.preferred_grade : 'N/A'} {data?.final_position && <span className='text-grey font-bold'> -- Final Grades: </span>}{data?.final_grade && <span className='text-green font-bold'>{data?.final_grade}</span>}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Preferred Subjects</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.preferred_subjects ? data?.preferred_subjects : 'N/A'} {data?.final_subjects && <span className='text-grey font-bold'> -- Final Subjects: </span>}{data?.final_subjects && <span className='text-green font-bold'>{data?.final_subjects}</span>}</h5>
            </div> 
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Substitute Position Availability</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.substitute_position_availability ? data?.substitute_position_availability : 'N/A'}</h5>
            </div> 
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Languages Spoken</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.language ? data?.language : 'N/A'}</h5>
            </div> 
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Additional Skills</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.additional_skills ? data?.additional_skills : 'N/A'}</h5>
            </div> 
        </div>
    )
}
