import Link from "next/link"
import Avatar from "../../public/icons/Avatar"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Delete from "../../public/icons/Delete";
import Cookies from "js-cookie";
export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  // const {logOut} = useFirebaseAuth();
  const logoutHandler = async () => {
    // const res = await logOut();
    // if(res.status){
    //   router.push("/");
    // }
  }
  const yesConfirmation = async () => {
    // setLoading(true);
    // await logoutHandler();
    Cookies.remove("token")
    router.push("/");
  } 
  return (
    <>
      <div className="sticky top-0 left-0 w-full h-dvh overflow-y-auto bg-neutral1 flex flex-wrap flex-col justify-between bg-green shadow-sm">
        <div className="">
          <div className="w-full px-5 h-24 items-center justify-center flex flex-wrap bg-white">
              <img className="size" src="/logo.png" alt="TechSA Logo" />
          </div>
          <ul className="p-0 px-5 m-0 flex flex-wrap mt-4">
            <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/dashboard") && 'bg-yellow'}`}>
              <Link href="/dashboard" className="w-full flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path className={`group-hover:fill-black ${router.asPath.startsWith("/dashboard") && 'fill-black'}`} d="M9 18H4V10H9V18ZM15 18H10V6H15V18ZM21 18H16V2H21V18ZM22 22H3V20H22V22Z" fill="white"/>
                </svg>
                <span className={`text-center text-lg group-hover:text-black  ${router.asPath.startsWith("/dashboard") ? 'text-black' :'text-white'}`}>Dashboard</span>
              </Link>
            </li>
            <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/verifications") && 'bg-yellow'}`}>
              <Link href="/verifications" className="w-full flex items-center gap-4">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path className={`group-hover:fill-black ${router.asPath.startsWith("/verifications") && 'fill-black'}`} d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71403 11.8922 2.71403 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM8.19258 4.50299C8.416 4.06569 8.92388 3.85532 9.39107 4.00656L11.0761 4.55201C11.6767 4.74644 12.3233 4.74644 12.9239 4.55201L14.609 4.00656C15.0761 3.85532 15.584 4.06569 15.8074 4.50298L16.6132 6.08016C16.9004 6.64234 17.3577 7.09958 17.9199 7.3868L19.497 8.19258C19.9343 8.416 20.1447 8.92388 19.9935 9.39107L19.448 11.0761C19.2536 11.6767 19.2536 12.3233 19.448 12.9239L19.9935 14.609C20.1447 15.0761 19.9343 15.584 19.497 15.8074L17.9199 16.6132C17.3577 16.9004 16.9004 17.3577 16.6132 17.9199L15.8074 19.497C15.584 19.9343 15.0761 20.1447 14.609 19.9935L12.9239 19.448C12.3233 19.2536 11.6767 19.2536 11.0761 19.448L9.39107 19.9935C8.92388 20.1447 8.416 19.9343 8.19258 19.497L7.3868 17.9199C7.09958 17.3577 6.64234 16.9004 6.08016 16.6132L4.50299 15.8074C4.06569 15.584 3.85532 15.0761 4.00656 14.609L4.55201 12.9239C4.74644 12.3233 4.74644 11.6767 4.55201 11.0761L4.00656 9.39107C3.85532 8.92388 4.06569 8.416 4.50299 8.19258L6.08016 7.3868C6.64234 7.09958 7.09958 6.64234 7.3868 6.08016L8.19258 4.50299ZM6.7596 11.7574L11.0022 16L18.0733 8.92897L16.6591 7.51476L11.0022 13.1716L8.17382 10.3431L6.7596 11.7574Z" fill="white"/>
                </svg>
                <span className={`text-center text-lg group-hover:text-black  ${router.asPath.startsWith("/verifications") ? 'text-black' :'text-white'}`}>Verifications</span>
              </Link>
            </li>
          <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/jobs") && 'bg-yellow'} ${router.asPath == `/jobs/${router.query.job}` && 'bg-yellow'}`}>
            <Link href="/jobs" className="w-full flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path className={`group-hover:fill-black ${router.asPath.startsWith("/jobs") && 'fill-black'} ${router.asPath.startsWith("/job-seekers") == `/jobs/${router.query.job}` && 'fill-black'}`} d="M6.99979 7V3C6.99979 2.44772 7.4475 2 7.99979 2H20.9998C21.5521 2 21.9998 2.44772 21.9998 3V16C21.9998 16.5523 21.5521 17 20.9998 17H17V20.9925C17 21.5489 16.551 22 15.9925 22H3.00728C2.45086 22 2 21.5511 2 20.9925L2.00276 8.00748C2.00288 7.45107 2.4518 7 3.01025 7H6.99979ZM8.99979 7H15.9927C16.549 7 17 7.44892 17 8.00748V15H19.9998V4H8.99979V7ZM8.50242 18L14.1593 12.3431L12.7451 10.9289L8.50242 15.1716L6.3811 13.0503L4.96689 14.4645L8.50242 18Z" fill="white"/>
              </svg>
              <span className={`text-center text-lg group-hover:text-black ${router.asPath.startsWith("/jobs") && 'text-black'} ${router.asPath == `/jobs/${router.query.job}` && 'text-black'} ${!router.asPath.includes("/jobs") && 'text-white' }`}>Posted Jobs</span>
            </Link>
          </li>
          <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/job-seekers") && 'bg-yellow'}`}>
            <Link href="/job-seekers" className="w-full flex items-center gap-4">
              
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path className={`group-hover:fill-black ${router.asPath.startsWith("/job-seekers") && 'fill-black'}`} d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5C8 9.11929 6.88071 8 5.5 8C4.11929 8 3 9.11929 3 10.5C3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8C19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056C18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z" fill="white"/>
              </svg>
              <span className={`text-center text-lg group-hover:text-black  ${router.asPath.startsWith("/job-seekers") ? 'text-black' :'text-white'}`}>Job Seekers</span>
            </Link>
          </li>
          <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/job-providers") && 'bg-yellow'}`}>
            <Link href="/job-providers" className="w-full flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path className={`group-hover:fill-black ${router.asPath.startsWith("/job-providers") && 'fill-black'}`} d="M14 14.252V22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" fill="white"/>
              </svg>
              <span className={`text-center text-lg group-hover:text-black  ${router.asPath.startsWith("/job-providers") ? 'text-black' :'text-white'}`}>Job Providers</span>
            </Link>
          </li>
          <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/reports") && 'bg-yellow'}`}>
              <Link href="/reports" className="w-full flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path className={`group-hover:fill-black ${router.asPath.startsWith("/reports") && 'fill-black'}`} d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13Z" fill="white"/>
                </svg>
                <span className={`text-center text-lg group-hover:text-black  ${router.asPath.startsWith("/reports") ? 'text-black' :'text-white'}`}>Reports</span>
              </Link>
            </li>
            <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/categories") && 'bg-yellow'}`}>
              <Link href="/categories" className="w-full flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path className={`group-hover:fill-black ${router.asPath.startsWith("/categories") && 'fill-black'}`} d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13Z" fill="white"/>
                </svg>
                <span className={`text-center text-lg group-hover:text-black  ${router.asPath.startsWith("/categories") ? 'text-black' :'text-white'}`}>Categories</span>
              </Link>
            </li>
            <li className={`group flex flex-wrap text-xxs w-full mt-0.5 py-3 px-5 hover:bg-yellow rounded-lg cursor-pointer ${router.asPath.startsWith("/revenue") && 'bg-yellow'}`}>
              <Link href="/revenue" className="w-full flex items-center gap-4">
                <img src={'/images/rand.svg'} alt="Currency" className='size-5 rounded-full' />
                <span className={`text-center text-lg group-hover:text-black  ${router.asPath.startsWith("/revenue") ? 'text-black' :'text-white'}`}>Revenue</span>
              </Link>
            </li>
            <li className="group flex flex-wrap text-xxs w-full mt-0.5 py-3 hover:bg-yellow px-5 rounded-lg cursor-pointer" onClick={() => setConfirmation(true)}>
              <div className="w-full flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path className={`group-hover:fill-black`} d="M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.7071 7.70711L12 13.4142L10.5858 12L16.2929 6.29289L13 3H21V11L17.7071 7.70711Z" fill="white"/>
                </svg>
                <span className="text-neutral4 text-center text-lg font-medium text-white group-hover:text-black">Logout</span>
              </div>
            </li> 
          </ul>
        </div>
      </div>

      {confirmation && <div className='z-50 fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur'>
        <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
          <h2 className='font-sora text-2xl text-center w-full font-semibold'>
            Do you want to logout?
          </h2>
          <h3 className='w-full text-sm text-center my-3 text-neutral-700 font-sora'>
            By clicking on Yes the current session will be expire. All the cookies used during the session will be clear as well.
          </h3>
          <div className='w-full grid grid-cols-2 mt-5 gap-3'>
            <Button variant="yellow" onClick={()=> setConfirmation(false)}>No</Button>
            <Button variant="danger" loading={loading} onClick={yesConfirmation}>Yes</Button>
          </div>
        </div>
      </div>}
    </> 
  )
}
