import { useRouter } from 'next/router';

export default function Stepper({step}) {
    return (
        <div className='w-full text-center flex flex-wrap justify-center items-center'>
            {/* <img src="/images/afro_logo_2.png" alt="Large afro logo" /> */}
            <h1 className='w-full text-2xl font-poppins font-bold text-black-2'>Give us a few more informations </h1>

            <div className='w-full flex flex-wrap justify-center items-center mt-5 transition-all'>
                <span className={`${(step >= 1)? step == 1 ? "border-green text-green" : 'bg-green border-green text-white':"bg-white border-4 border-border-input"}  border-4 size-14 border-solid flex flex-wrap items-center justify-center rounded-full `}>1</span>
                <span className={`h-1 w-5 ${(step && step > 1)?"bg-green":"bg-white"} `}></span>
                <span className={`h-1 w-5 ${(step && step >= 2)?"bg-green":"bg-white"} `}></span>
                <span className={`${(step >= 2)? step == 2 ? "border-green text-green" : 'bg-green border-green text-white':"bg-white border-4 border-border-input"}  border-4 size-14 border-solid flex flex-wrap items-center justify-center rounded-full `}>2</span>
                <span className={`h-1 w-5 ${(step && step > 2)?"bg-green":"bg-white"} `}></span>
                <span className={`h-1 w-5 ${(step && step >= 3)?"bg-green":"bg-white"} `}></span>
                <span className={`${(step >= 3)? step == 3 ? "border-green text-green" : 'bg-green border-green text-white':"bg-white border-4 border-border-input"}  border-4 size-14 border-solid flex flex-wrap items-center justify-center rounded-full `}>3</span>
            </div>
        </div>
    )
}