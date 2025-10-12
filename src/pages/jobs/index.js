import Button from '@/components/Button'
import Layout from '@/layout/Layout'
import Eventcard from '@/modules/Eventcard'
import FilterBar from '@/modules/FilterBar'
import JobCard from '@/modules/JobCard'
import Loader from '@/modules/Loader'
import Pagination from '@/modules/Pagination'
import SingleJob from '@/modules/SingleJob'
import SingleProvider from '@/modules/SingleProvider'
import { getAllJobs } from '@/services/APIs/jobs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import cookie from "cookie";
// import { getAllEvents } from '@/services/server-apis/events';

export default function Index({events}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters,setFilters] = useState({
    user:'',
    sort:'',
    keyword:'',
    status:'',
    page:1,
    limit:50
  })
  const filterHandler = (user,sort,keyword,status,page,limit) => {
    setFilters({
      user:user,
      sort:sort,
      keyword:keyword,
      status:status,
      page:page,
      limit:limit
    })
    let query = '?page='+page+"&per_page="+limit

    if(sort != ''){
      query = query+'&sort='+sort
    }
    if(status != ''){
      if(status == '1') query = query+'&is_boosted=1'
      else query = query+'&is_boosted=0'
    }
    if(keyword != ''){
      query = query+'&search='+keyword
    }

    dataSetter(query)
  }
  const dataSetter = async (query) => {
    setLoading(true);
    const response = await getAllJobs(query)
    if(response.status){
      setData(response.data);
      setLoading(false);
    }
  }
  useEffect(()=>{
    dataSetter('?page=1&per_page=50')
  },[])
  return (
    <Layout>
      <div className='w-full flex flex-wrap items-center justify-between'>
        <h1 className='text-black-4 text-3xl font-semibold'>Posted Jobs</h1>
      </div>
      <div className='w-full shadow-searchbox mt-5 rounded-md'>
        <FilterBar data={data} job={true} handler={filterHandler} />
        {/* <div className='w-full bg-[#f1f1f1] rounded-t-md flex items-center justify-between px-5 py-3'>
          <h6 className='text-sm font-normal text-input-label w-1/6'>Company</h6>
          <h6 className='text-sm font-normal text-input-label w-1/6'>Job Title</h6>
          <h6 className='text-sm font-normal text-input-label w-1/12 text-center'>Job Category</h6>
          <h6 className='text-sm font-normal text-input-label w-1/12 text-center'>Job Type</h6>
          <h6 className='text-sm font-normal text-input-label w-1/12 text-center'>Submissions</h6>
          <h6 className='text-sm font-normal text-input-label w-12 text-center'>Action</h6>
        </div> */}
        {loading && <Loader />}
        {!loading && data && data?.data?.length == 0 && <h6 className="w-full text-center text-black font-normal text-base p-5 bg-white">No data found!</h6>}
        
        {!loading && <div className='w-full bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5 3xl:grid-cols-4'>
          {data && data?.data?.map((item, index) => <JobCard data={item} key={`Job-card-${index}`} />)}
        </div>}
        {data && <Pagination filters={filters} data={data} handler={filterHandler} />}
      </div>
    </Layout>
  )
}