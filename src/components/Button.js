import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/Utilities/cn'

export default function Button({children,variant, buttonType,size, className, loading=false, ...attributes}) {
  return (
    <button className={cn(buttonVariants({variant,buttonType,size,className}),loading?"cursor-not-allowed":"")} disabled={loading} {...attributes}>
        {children}

        {loading && <svg className='animate-spin ml-2 size-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z" fill="white"/>
        </svg>}
    </button>
  )
}

const buttonVariants = cva("font-medium rounded-lg text-base flex items-center justify-center",{
    variants:{
        variant:{
            green:"bg-green text-white hover:bg-green-dark border-none",
            yellow: "bg-yellow text-black border-none",
            "green-with-border": "bg-white text-green border-green border border-solid hover:bg-green hover:text-white",
            "white-border": "bg-white text-green border-none",
            "danger": "bg-danger text-white border-none",
            "disable-green": "bg-green-light text-white border-none",
            "disable-yellow": "bg-neutral2 text-neutral3 border-none",
            "black": "bg-neutral5 text-white border-none hover:bg-black",
            "normal":'text-black bg-[#f1f1f1] border-none'
        },
        buttonType:{
            sm: "text-sm px-3 py-2.5",
            md: "text-base px-4 py-3",
            lg: "text-lg px-4 py-3",
            submit: "text-base px-4 py-3"
        },
        size:{
            fw:"w-full",
        }
    },
    defaultVariants:{
        variant: "primary",
        buttonType: "md",
        size: "fw"
    }
})