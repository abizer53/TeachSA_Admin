import Dropdown from '@/components/Dropdown'
import Layout from '@/layout/Layout'
import GrpahChart from '@/modules/Chart'
import Chart from '@/modules/Chart'
import ChartRevenue from '@/modules/ChartRevenue'
import { getDashboardCharts, getDashboardStats } from '@/services/APIs/jobs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const [data,setData] = useState('')
    const [chartData,setChartData] = useState({
        xaxis:'',
        revenue:'',
        seekers:'',
        employers:''
    })

    const dropdownData = [
        {
            value:"This Week",
            id:'this_week'
        },
        {
            value:"Past Week",
            id:'past_week'
        },
        {
            value:"This Month",
            id:'this_month'
        },
        {
            value:"This Year",
            id:'this_year'
        }
    ]
    const dropdownHandler = (val,val2) => {
        chartsDataSetter(val2)
    }
    const dataSetter = async () => {
        const response = await getDashboardStats("")
        if(response.status){
            setData(response.data)
        }
    }
    const chartsDataSetter = async (val) => {
        const formdata = new FormData();
        formdata.append("filter", val);
        const response = await getDashboardCharts(formdata)
        if(response.status){
            const xaxis = []
            const revenue = []
            const seekers = [] 
            const employers = []
            if(val == 'past_week' || val == 'this_week'){
                response.data.map((item)=>{
                    xaxis.push(item.day)
                    revenue.push(item.total_revenue)
                    employers.push(item.total_emp)
                    seekers.push(item.total_users)
                })
            }else if(val == 'this_month'){
                response.data.map((item)=>{
                    xaxis.push(`${dayjs(item.week_start).format("D-MMM")} to ${dayjs(item.week_end).format("D-MMM")}`)
                    revenue.push(item.total_revenue)
                    employers.push(item.total_emp)
                    seekers.push(item.total_users)
                })
            }else{
                response.data.map((item)=>{
                    xaxis.push(item.month)
                    revenue.push(item.total_revenue)
                    employers.push(item.total_emp)
                    seekers.push(item.total_users)
                })
            }
            setChartData({
                xaxis:xaxis,
                revenue:revenue,
                seekers:seekers,
                employers:employers
            })
        }
    }
    useEffect(()=>{
        dataSetter()
        chartsDataSetter('past_week')
    },[])
    return (
        <Layout>
            <div className='w-full flex flex-wrap items-center justify-between'>
                <h1 className='text-black-4 text-3xl font-semibold'>Dashboard</h1>
                <div className='w-[140px]'>
                    <Dropdown placeholder="Past Week" data={dropdownData} handler={dropdownHandler} />
                </div>
            </div>
            <div className='w-full grid grid-cols-4 gap-5 mt-5'>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Total Employers</h5>
                    <h4 className='text-black leading-normal font-medium text-base'>{data?.totalJobProviders ? data?.totalJobProviders : 0}</h4>
                </div>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Pending Verifications of Employers</h5>
                    <h4 className='text-black leading-normal font-medium text-base'>{data?.jobProviderVerificationPending ? data?.jobProviderVerificationPending : 0}</h4>
                </div>
                
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Total Seekers</h5>
                    <h4 className='text-black leading-normal font-medium text-base'>{data?.totalJobSeeker ? data?.totalJobSeeker : 0}</h4>
                </div>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Pending Verifications of Seekers</h5>
                    <h4 className='text-black leading-normal font-medium text-base'>{data?.jobSeekerVerificationPending ? data?.jobSeekerVerificationPending : 0}</h4>
                </div>
                
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Total Prime Providers</h5>
                    <h4 className='text-black leading-normal font-medium text-base'>{data?.totalMembershipEMP ? data?.totalMembershipEMP : 0}</h4>
                </div>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Total Prime Seekers</h5>
                    <h4 className='text-black leading-normal font-medium text-base'>{data?.totalMembershipUser ? data?.totalMembershipUser : 0}</h4>
                </div>
                <div className='border p-3 bg-white rounded-md'>
                    <h5 className='text-grey font-normal text-sm leading-normal'>Total Jobs Posted</h5>
                    <h4 className='text-black leading-normal font-medium text-base'>{data?.totalJob ? data?.totalJob : 0}</h4>
                </div>
            </div>
            {chartData && <div className='w-full grid gap-5 mt-6'>
                <GrpahChart data={chartData} />
                <ChartRevenue data={chartData}/>
            </div>}
        </Layout>
    )
}
