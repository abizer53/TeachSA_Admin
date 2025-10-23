import Layout from '@/layout/Layout'
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import Popuplist from '@/components/Popuplist';
import Google from '../../../public/icons/Google';
import Clock from '../../../public/icons/Clock';
import Link from 'next/link';
import Location from '../../../public/icons/Location';
import AppliedShield from '../../../public/icons/AppliedShield';
import Button from '@/components/Button';
import SuggestionCard from '@/modules/SuggestionCard';
import { useEffect, useState } from 'react';
import SendMessageModal from '@/modules/SendMessagModal';
import Edit from '../../../public/icons/Edit';
import Delete from '../../../public/icons/Delete';
import DeleteModal from '@/modules/DeleteModal';
import { getAppliedUsersOfJob, getSingleJob } from '@/services/APIs/jobs';
import relativeTime from 'dayjs/plugin/relativeTime'
import DollarCircle from '../../../public/icons/DollarCircle';
import Tag from '../../../public/icons/Tag';
import Loader from '@/modules/Loader';
import FilterBar from '@/modules/FilterBarJob';
import Pagination from '@/modules/Pagination';
import Lock from '../../../public/icons/Lock';
import LargePhotoModal from '@/modules/LargePhotoModal';
dayjs.extend(relativeTime)
export default function EventDetails({event}) {
    const router = useRouter()
    const [data,setData] = useState('')
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
    const [messageModal,setMessageModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [usersData,setUsersData] = useState([])
    const [filters,setFilters] = useState({
        name:'',
        status:'',
        page:1,
        limit:10
    })
    const messageHandler = () => {
        setMessageModal(!messageModal)
    }
    const deleteModalHandler = () => {
        setDeleteModal(!deleteModal)
    }
    const dataSetter = async () => {
        setLoading(true);
        const response = await getSingleJob(router.query.job)
        if(response.status){
            setData(response.data);
        }
        setLoading(false);
    }
    
    const getUserListHandler = async (query) => {
        setLoading2(true)
        const resposne = await getAppliedUsersOfJob(router.query.job,query)
        if(resposne?.status){
            setUsersData(resposne.data)
            setLoading2(false)
        }else{
            setLoading2(false)
        }
    }
    const filterHandler = async (name,status,page,limit) => {
        setFilters({
            name:name,
            status:status,
            page:page,
            limit:limit
        })
        let query = '?status='+status
        if(name){
            query = query+'&search='+name
        }
        getUserListHandler(query)
    }
    useEffect(()=>{
        dataSetter()
        getUserListHandler("")
    },[])
    const [openModal,setOpenModal] = useState(false)
    const openModalHandler = () => setOpenModal(!openModal)
  
    return (
        <Layout>
            {deleteModal && <DeleteModal handler={deleteModalHandler} />}
            {openModal && <LargePhotoModal source={data?.job_thumbnail} handler={openModalHandler} />}
            {!loading && data && <div className='w-full mt-2 bg-white rounded-2xl py-2 flex flex-wrap items-start justify-center'>
                <div className='w-full flex flex-wrap mt-2 rounded-xl p-5'>
                    <div className='w-full flex justify-between'>
                        <div className='flex flex-wrap gap-4'>
                            <div className='flex items-center justify-center size-16 shadow-searchbox rounded-md relative'>
                                <img src={data?.job_thumbnail} alt="" className="size-20 rounded-md" />
                                {data?.job_thumbnail&& <div onClick={openModalHandler} className='-top-4 -right-2 cursor-pointer shadow bg-white rounded-full p-2 absolute'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                                </div>}
                            </div>
                            <div>
                                <h4 className='text-black font-semibold text-xl font-sans flex hover:text-green'>{data?.job_title}</h4>
                                <div className='flex flex-wrap items-center gap-2 mt-1'>
                                    {data?.post_anonymously !== 'yes' && <div className='flex border items-center px-2 gap-2 mr-2 py-1 rounded-md'>
                                        <img src={data?.company?.upload_logo ? data?.company.upload_logo : "/images/event.jpg"} alt="logo" className='size-5 rounded-full' />
                                        <h5 className='rounded-md font-normal text-base text-black mr-2'>{data?.company?.company_name}</h5>
                                    </div>}
                                    {/* <h5 className='px-2 py-1 rounded-md font-normal text-base bg-green-lightier text-grey mr-2'>{data?.company?.company_name}</h5> */}
                                    <Location/>
                                    <h6 className='text-[#94a3b8] font-normal text-sm pr-2'>{data?.location}</h6>
                                    <Clock/>
                                    <h6 className='text-[#94a3b8] font-normal text-sm pr-2'>{dayjs(data?.created_at).fromNow()}</h6>
                                    <Tag/>
                                    <h5 className="text-[#94a3b8] font-normal text-sm mr-2">{data?.job_category}</h5>
                                    <AppliedShield/>
                                    <h4 className='text-[#94a3b8] font-normal text-sm mr-2'>{data?.applied_job?.length} Applicants</h4>
                                    {/* <h5 className='py-1 px-2 ml-2 rounded-md h-fit font-normal text-sm bg-green-lightier text-green'>{data?.job_type}</h5>                                      */}
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-3 gap-5 mt-8'>
                                <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Job Type</p>
                                    <h5 className='font-normal text-sm text-black leading-normal'>{data?.job_type}</h5>     
                                </div>
                                {/* <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Job Position</p>
                                    <h5 className='font-normal text-sm text-black leading-normal'>{data?.job_position}</h5>     
                                </div> */}
                                <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Salary</p>
                                    <h5 className='font-normal text-sm text-black flex items-center gap-1 leading-normal'><img src="/images/rand.svg" alt="R" className='size-5' /> {data?.minimum_salary} - {data?.maximum_salary}</h5>     
                                </div>
                                <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Required Languages</p>
                                    <h5 className='font-normal text-sm text-black leading-normal'>{data?.languages ? data?.languages : 'N/A'}</h5>     
                                </div>
                                <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Posted Anonymously</p>
                                    <h5 className='font-normal text-sm text-black capitalize leading-normal'>{data?.post_anonymously == 'yes' ? "Yes":"No"}</h5>     
                                </div>
                                <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Salary Negotiable</p>
                                    <h5 className='font-normal text-sm text-black capitalize leading-normal'>{data?.salary_negotiable == 'true'? "Yes":"No"}</h5>     
                                </div>
                                {/* {data?.position_for_grade_or_levels && <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Position Grades</p>
                                    <h5 className='font-normal text-sm text-black leading-normal'>{data?.position_for_grade_or_levels}</h5>     
                                </div>}
                                {data?.position_for_grade_or_levels && <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Prefer Subjects</p>
                                    <h5 className='font-normal text-sm text-black leading-normal'>{data?.prefer_subject}</h5>     
                                </div>} */}
                                {data?.qualifications && <div className='border rounded-md px-5 py-3'>
                                    <p className='text-sm font-medium text-grey mb-1'>Qualifications Needed</p>
                                    <h5 className='font-normal text-sm text-black leading-normal'>{data?.qualifications ? data?.qualifications : "No"}</h5>     
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='border rounded-md px-5 py-3 w-full mt-5'>
                        <p className='text-sm font-medium text-grey'>Job Description</p>
                        <p className="text-black font-normal text-sm w-full mt-1">{data?.job_description}</p>
                    </div>
                </div>
                <div className='w-full flex flex-wrap mt-5 border-t'>
                    <FilterBar filters={filters} data={usersData} status={true} handler={filterHandler}/>
                    <div className='w-full px-6 py-3.5 bg-green-lightier flex items-center justify-between'>
                        <h5 className='font-poppins text-xs text-[#8181A5] w-2/12 font-semibold'>Username</h5>
                        <h5 className='font-poppins text-xs text-[#8181A5] w-3/12 font-semibold'>Email</h5>
                        <h5 className='font-poppins text-xs text-[#8181A5] w-2/12 font-semibold text-center'>Date Applied</h5>
                        <h5 className='font-poppins text-xs text-[#8181A5] w-2/12 font-semibold text-center'>Status</h5>
                        <h5 className='font-poppins text-xs text-[#8181A5] w-2/12 font-semibold text-center'>Action</h5>
                    </div>
                    {loading2 && <Loader/>}
                    {!loading2 && data?.applied_job?.length == 0 && <h6 className="w-full mt-5 p-5 text-black text-center">No applicants!</h6>}
                    {!loading2 && usersData && usersData?.data?.map((item,index)=><div key={index}  className='px-6 border-t py-3.5 w-full flex items-center justify-between'>
                        <h5 className='font-poppins text-xs text-black w-2/12 font-normal'>{item?.full_name ? item?.full_name : 'N/A'}</h5>
                        <h5 className='font-poppins text-xs text-black w-3/12 font-normal'>{item?.email ? item?.email : 'N/A'}</h5>
                        <h5 className='font-poppins text-xs text-black w-2/12 font-normal text-center'>{dayjs(item?.applied_jobs[0]?.created_at).format("DD MMM YYYY")}</h5>
                        <div className='w-2/12 flex justify-center'>
                        {item?.applied_jobs[0]?.application_status == 0 && <h6 className='text-sm font-normal bg-yellow px-4 py-1 rounded-md text-black w-fit text-center'>Pending</h6>}
                        {item?.applied_jobs[0]?.application_status == 1 && <h6 className='text-sm font-normal bg-blue px-4 py-1 rounded-md text-white w-fit text-center'>Shortlisted</h6>}
                        {item?.applied_jobs[0]?.application_status == 3 && <h6 className='text-sm font-normal bg-green px-4 py-1 rounded-md text-white w-fit text-center'>Hired</h6>}
                        {item?.applied_jobs[0]?.application_status == 2 && <h6 className='text-sm font-normal bg-danger px-4 py-1 rounded-md text-white w-fit text-center'>Rejected</h6>}
                        </div>
                        <div className='flex flex-wrap items-center justify-center w-2/12'>
                            <div className='flex gap-2 items-center justify-center'>
                                <Link href={`/job-seekers/${item.id}`}>
                                <svg className='stroke-green' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                </Link>
                            </div>
                        </div>
                    </div>)}
                    {usersData && <Pagination filters={filters} data={usersData} handler={filterHandler} />}
                    {messageModal && <SendMessageModal handler={messageHandler} />}
                </div>
            </div>}
            {loading && <Loader/>}
        </Layout>
    )
}
export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}