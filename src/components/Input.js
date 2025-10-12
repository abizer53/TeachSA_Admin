import { cn } from '@/Utilities/cn'
import { cva } from 'class-variance-authority'
import React from 'react'

export default function Input({children,variant, invalidmessage,type, className, ...attributes}) {
    return (
        <>
            <input type={type} {...attributes} className={cn(inputVariants({variant, type, className}))} />
            {/* {invalidmessage && <span className="w-full my-1 hidden peer-invalid:block text-danger text-sm">
                {invalidmessage}
            </span>} */}
        </>
    )
}

const inputVariants = cva("w-full peer focus:outline-none",{
    variants:{
        variant:{
            mfa:"font-inter rounded-lg border border-solid border-border-input px-3 py-2.5 font-normal text-sm text-black placeholder-shown:text-placeholder"
        },
        type:{
            "email": "focus:border-green focus:border-2 invalid:border-danger invalid:border-2 invalid:shadow-md",
            "text": "focus:border-green focus:border-2 invalid:border-danger invalid:border-2 invalid:shadow-md",
            "password": "focus:border-green focus:border-2 invalid:border-danger invalid:border-2 invalid:shadow-md",
            "number": "focus:border-green focus:border-2 invalid:border-danger invalid:border-2 invalid:shadow-md disable-scroller"
        }
    },
    defaultVariants:{
        variant: "mfa",
        type: "email"
    }
})