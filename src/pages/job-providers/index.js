import Button from '@/components/Button'
import Layout from '@/layout/Layout'
import Eventcard from '@/modules/Eventcard'
import FilterBar from '@/modules/FilterBar'
import JobCard from '@/modules/JobCard'
import Loader from '@/modules/Loader'
import Pagination from '@/modules/Pagination'
import SingleProvider from '@/modules/SingleProvider'
import SingleUser from '@/modules/SingleUser'
import { getAllProviders } from '@/services/APIs/users'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Index({events}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters,setFilters] = useState({
    user:'',
    sort:'',
    keyword:'',
    status:'',
    page:1,
    limit:10
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

    if(status != ''){
      query = query+'&is_verify='+status
    }
    if(sort != ''){
      query = query+'&sort='+sort
    }
    if(keyword != ''){
      query = query+'&search='+keyword
    }
    dataSetter(query)
  }
  const dataSetter = async (query) => {
    setLoading(true);
    const response = await getAllProviders(query)
    if(response.status){
      setData(response.data);
      setLoading(false);
    }else{
      setLoading(false)
    }
  }
  useEffect(()=>{
    dataSetter()
  },[])
  return (
    <Layout>
      <div className='w-full flex flex-wrap items-center justify-between'>
        <h1 className='text-black-4 text-3xl font-semibold'>Job Providers</h1>
      </div>
      <div className='w-full shadow-searchbox mt-5 rounded-md'>
        <FilterBar data={data} status={true} handler={filterHandler} />
        <div className='w-full bg-[#f1f1f1] flex items-center justify-between px-5 py-3'>
          <h6 className='text-sm font-normal text-input-label w-3/12'>Company</h6>
          {/* <h6 className='text-sm font-normal text-input-label w-1/6'>Company Id</h6> */}
          {/* <h6 className='text-sm font-normal text-input-label w-1/6'>Reg No.</h6> */}
          <h6 className='text-sm font-normal text-input-label w-2/12'>Username</h6>
          <h6 className='text-sm font-normal text-input-label w-3/12'>Contact</h6>
          <h6 className='text-sm font-normal text-input-label w-2/12 text-center'>Status</h6>
        <h6 className='text-sm font-normal text-input-label w-1/12 text-center'>Action</h6>
        </div>
        {loading && <Loader/>}
        {!loading && data && data?.data?.length == 0 && <h6 className="w-full text-center text-black font-normal text-base p-5 bg-white">No data found!</h6>}
        {!loading && data && data?.data?.map((item, index) => <SingleProvider data={item} key={`Job-card-${index}`} />)}
        {data && <Pagination filters={filters} data={data} handler={filterHandler} />}
      </div>
    </Layout>
  )
}