import React,{useEffect, useState} from 'react'
import dynamic from "next/dynamic";
export default function ChartRevenue({data}) {
    const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
    const [data2,setData2] = useState({
        options: {
          chart: {
            id: "earning-graph",
            toolbar:{
              show:true
            },
          },
          xaxis: {
            categories: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
          },
          stroke: {
            curve: 'smooth'
          },
          dataLabels:{
            enabled:false
          },
          plotOptions: {
            bar: {
              columnWidth: '25%',
            }
          }
        },
      
        series: [
            {
                name: 'Seekers',
                data: [10,15,75,50,5,35,62],
                color:"#fdd106"
            }, 
            {
                name: 'Providers',
                data: [35,75,27,59,12,5,78],
                color:"#228B22"
            },
        ]
    })
    useEffect(()=>{
      if(data.xaxis && data.employers && data.seekers){
        setData2({
          options: {
            chart: {
              id: "earning-graph",
              toolbar:{
                show:true
              },
            },
            xaxis: {
              categories: data?.xaxis
            },
            stroke: {
              curve: 'smooth'
            },
            dataLabels:{
              enabled:false
            },
            plotOptions: {
              bar: {
                columnWidth: '25%',
              }
            }
          },
        
          series: [
              {
                  name: 'Seekers',
                  data: data?.seekers,
                  color:"#fdd106"
              }, 
              {
                  name: 'Providers',
                  data: data?.employers,
                  color:"#228B22"
              },
          ]
        })
      }
    },[data])
    return (
        <div className='border bg-white rounded-md p-5 rounded-8 w-full'>
            <div className='flex items-center mb-4 justify-between'>
                <h4 className='text-base font-semibold text-black pl-4'>Users</h4>
            </div>
            <Chart
                options={data2.options}
                series={data2.series}
                type="line"
                width={"98%"}
                height={330}
            />
        </div>
    )
}
