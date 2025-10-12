import Dropdown from '@/components/Dropdown'
import Layout from '@/layout/Layout'
import Chart from '@/modules/Chart'
import ChartRevenue from '@/modules/ChartRevenue'
import FilterBar from '@/modules/FilterBar'
import Loader from '@/modules/Loader'
import Pagination from '@/modules/Pagination'
import SingleTransaction from '@/modules/SingleTransaction'
import { getRevenueStats, getTransactions } from '@/services/APIs/jobs'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Revenue() {
    const [data,setData] = useState('')
    const [transactionData,setTransactionsData] = useState('')
    const [loading,setLoading] = useState(false)
    const dropdownData = [
        {
            value:"This Week"
        },
        {
            value:"Past Week"
        },
        {
            value:"This Month"
        },
        {
            value:"This Year"
        }
    ]
    const filterHandler = () => {

    }
    const transactionSetter = async () => {
        setLoading(true)
        const response = await getTransactions("")
        if(response.status){
            setTransactionsData(response.data)
        }
        setLoading(false)
    }
    const dataSetter = async () => {
        const response = await getRevenueStats("")
        if(response.status){
            setData(response.data)
        }
    }
    useEffect(()=>{
        dataSetter()
        transactionSetter()
    },[])
    return (
        <Layout>
            <div className='w-full flex flex-wrap items-center justify-between'>
                <h1 className='text-black-4 text-3xl font-semibold'>Revenue</h1>
                {/* <div className='w-[140px]'>
                    <Dropdown placeholder="Select" data={dropdownData} />
                </div> */}
            </div>
            <div className='w-full grid grid-cols-3 gap-5 mt-5'>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Total Revenue Earned</h5>
                    <h4 className='text-black leading-normal font-medium text-base flex items-center gap-1 mt-1'><img src="/images/rand.svg" alt="" className='size-7' />{data?.adminTotalRevenue}</h4>
                </div>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Revenue Earned From Job Seekers</h5>
                    <h4 className='text-black leading-normal font-medium text-base flex items-center gap-1 mt-1'><img src="/images/rand.svg" alt="" className='size-7' />{data?.seekerSub}</h4>
                </div>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Revenue Earned From Job Providers</h5>
                    <h4 className='text-black leading-normal font-medium text-base flex items-center gap-1 mt-1'><img src="/images/rand.svg" alt="" className='size-7' />{data?.empSub}</h4>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-10'>
                <div className='w-full mt-5 rounded-lg h-fit'>
                    <h3 className='text-xl text-black font-bold mb-3'>Seekers</h3>
                    <div className='w-full bg-yellow rounded-t-lg flex items-center justify-between px-5 py-3'>
                        <h6 className='text-sm font-normal text-input-label w-1/3'>Username</h6>
                        <h6 className='text-sm font-normal text-input-label w-1/3 text-center'>Date</h6>
                        <h6 className='text-sm font-normal text-input-label w-1/3 text-center'>Amount</h6>
                    </div>
                    {transactionData?.seekerSub?.length == 0 && <h6 className='p-5 text-center text-black text-sm font-normal'>No transactions found!</h6>}
                    {transactionData?.seekerSub?.map((item,index)=><div key={index} className='w-full bg-white hover:bg-zinc-100 border border-b-0 flex items-center justify-between px-5 py-3'>
                        <Link href={`/job-seekers/${item?.user_id}`} className='text-sm font-normal text-black w-1/3'>{item?.user?.full_name}</Link>
                        <h6 className='text-sm font-normal text-black w-1/3 text-center'>{dayjs(item?.createdAt).format("DD MMM YYYY")}</h6>
                        <h6 className='text-sm font-normal text-black w-1/3 justify-center flex items-center gap-1'><img src="/images/rand.svg" className='size-7' alt="R" />{item?.price}</h6>
                    </div>)}
                </div>
                <div className='w-full mt-5  h-fit'>
                    <h3 className='text-xl text-black font-bold mb-3'>Providers</h3>
                    <div className='w-full bg-yellow rounded-t-lg flex items-center justify-between px-5 py-3'>
                        <h6 className='text-sm font-normal text-input-label w-1/3'>Username</h6>
                        <h6 className='text-sm font-normal text-input-label w-1/3 text-center'>Date</h6>
                        <h6 className='text-sm font-normal text-input-label w-1/3 text-center'>Amount</h6>
                    </div>
                    {transactionData?.empSub?.length == 0 && <h6 className='p-5 text-center text-black text-sm font-normal'>No transactions found!</h6>}
                    {transactionData?.empSub?.map((item,index)=><div key={index} className='w-full bg-white hover:bg-zinc-100 border border-b-0 flex items-center justify-between px-5 py-3'>
                        <Link href={`/job-providers/${item?.emp_id}`} className='text-sm font-normal text-black w-1/3'>{item?.emp?.full_name}</Link>
                        <h6 className='text-sm font-normal text-black w-1/3 text-center'>{dayjs(item?.createdAt).format("DD MMM YYYY")}</h6>
                        <h6 className='text-sm font-normal text-black w-1/3 justify-center flex items-center gap-1'><img src="/images/rand.svg" className='size-7' alt="R" />{item?.price}</h6>
                    </div>)}
                </div>
            </div>
            {loading && <Loader/>}

            {/* <div className='w-full gap-5 mt-6'>
                <Chart/>
            </div> */}
        </Layout>
    )
}
