import Button from '@/components/Button'
import Layout from '@/layout/Layout'
import CreateCategoryModal from '@/modules/CreatecategoryModal'
import Eventcard from '@/modules/Eventcard'
import FilterBar from '@/modules/FilterBar'
import JobCard from '@/modules/JobCard'
import Loader from '@/modules/Loader'
import Pagination from '@/modules/Pagination'
import SingleCategory from '@/modules/SingleCategory'
import SingleJob from '@/modules/SingleJob'
import SingleProvider from '@/modules/SingleProvider'
import SingleReport from '@/modules/SingleReport'
import { getAllCategories, getAllReports } from '@/services/APIs/categories'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import cookie from "cookie";
// import { getAllEvents } from '@/services/server-apis/events';

export default function Index({events}) {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [createModal,setCreateModal] = useState(false)
  const [filters,setFilters] = useState({
    user:'',
    sort:'',
    keyword:'',
    status:'',
    page:1,
    limit:10
  })
  const createHandler = () => {
    setCreateModal(!createModal)
  }
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
      query = query+'&status='+status
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
    setLoading(true)
    const response = await getAllReports(query)
    if(response.status){
      setData(response.data)
      setLoading(false)
    }else{
      setLoading(false)
    }
  }
  useEffect(()=>{
    dataSetter('')
  },[])
  return (
    <Layout>
      <div className='w-full flex flex-wrap items-center justify-between'>
        <h1 className='text-black-4 text-3xl font-semibold'>Reports</h1>
      </div>
      <div className='w-full shadow-searchbox mt-5 rounded-md'>
        <FilterBar data={data} handler={filterHandler} />
        <div className='w-full bg-[#f1f1f1] flex items-center justify-between px-5 py-3'>
          <h6 className='text-sm font-normal text-input-label w-1/6'>Report For</h6>
          <h6 className='text-sm font-normal text-input-label w-1/6'>Employer Name</h6>
          <h6 className='text-sm font-normal text-input-label w-1/6'>Seeker Name</h6>
          <h6 className='text-sm font-normal text-input-label w-2/6'>Message</h6>
        </div>
        {loading && <Loader/>}
        {!loading && data && data?.data?.length == 0 && <h6 className="w-full text-center text-black font-normal text-base p-5 bg-white">No data found!</h6>}
        {!loading && data && data?.data?.map((item, index) => <SingleReport data={item} refresh={dataSetter} key={`Job-card-${index}`} />)}
        {data && <Pagination filters={filters} data={data} handler={filterHandler} />}
      </div>
    </Layout>
  )
}