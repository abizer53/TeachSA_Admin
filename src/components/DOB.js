"use client"
import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { cn } from '@/Utilities/cn'
import Dates from '@/Utilities/dates'
export default function DOB({variant, className, callback, date, ...atributes}) {
    const [dates, setDates] = useState(null);
    const [day, setDay] = useState("18")
    const [month, setMonth] = useState("02")
    const [year, setYear] = useState("1997")
    const dayHandler = (val) => {
        setDay(val.id)
    }
    const monthHandler = (val) => {
        setMonth(val.id)
    }
    const yearHandler = (val) => {
        setYear(val.id)
        let date = new Date(`"${val.id}-${month}-${day}"`)
        callback(date);
    }
    useEffect(()=>{
        setDates(Dates())
        if(date){
            setDay(date.getDate());
            setMonth(date.getMonth() + 1);
            setYear(date.getFullYear());
        }
    },[date])
    return (
        <div className={cn('w-full grid grid-cols-3 gap-3', className)} {...atributes}>
            <Dropdown data={dates && dates.days} value={day} placeholder="Day" callback={dayHandler} />
            {(variant && variant=="long")?<Dropdown value={month} callback={monthHandler} data={dates && dates.months.long} placeholder="Month"  />:<Dropdown value={month} data={dates && dates.months.short} placeholder="Month" callback={monthHandler} />}
            <Dropdown data={dates && dates.year} value={year} placeholder="Year" callback={yearHandler} />
        </div>
    )
}
