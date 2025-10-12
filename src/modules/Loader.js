import React from 'react'
import { RotatingTriangles } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className='w-full flex items-center justify-center my-3 bg-white'>
            <RotatingTriangles
                visible={true}
                height="100"
                width="100"
                ariaLabel="rotating-triangels-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-triangels-wrapper"
                colors={['#228B2240', '#fdd106', '#1c6e1c']}
            />
        </div>
    )
}
