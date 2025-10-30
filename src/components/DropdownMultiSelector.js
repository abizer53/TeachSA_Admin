import React, { useState, useEffect, useRef } from 'react'
import Cross from '../../public/icons/Cross'

export default function DropdownMultiSelector(props) {
  const [value, setValue] = useState([])
  const [show, setShow] = useState(false)
  const dropdownRef = useRef(null)

  const handler = (e) => {
    e.stopPropagation()
    const val = e.currentTarget.getAttribute("value")

    // Toggle selection
    if (value.includes(val)) {
      const filter = value.filter((item) => item !== val)
      setValue(filter)
    } else {
      setValue([...value, val])
    }
  }

  const removeHandler = (e) => {
    e.stopPropagation()
    const val = e.currentTarget.getAttribute("value")
    const filter = value.filter((item) => item !== val)
    setValue(filter)
  }

  // ✅ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div ref={dropdownRef} className="relative w-full">
        <div
          onClick={() => setShow(!show)}
          className={`w-full border border-solid border-border-input bg-white ${show ? 'rounded-sm' : 'rounded-md'}`}
        >
          <h5 className={`text-sm px-3 py-2.5 font-normal w-full cursor-pointer text-placeholder`}>
            {props.placeholder}
          </h5>

          {show && (
            <div className="border bg-white border-solid border-border-input rounded-sm absolute w-full left-0 top-12 max-h-[180px] overflow-y-auto z-50">
              {props.data?.map((item, index) => (
                <h5
                  key={index}
                  value={item.value}
                  onClick={handler}
                  className={`text-sm font-normal px-4 py-2 cursor-pointer hover:bg-green-light ${
                    value.includes(item.value) ? 'bg-green-light text-black' : 'text-black'
                  }`}
                >
                  {item.value}
                </h5>
              ))}
            </div>
          )}
        </div>

        {value.length > 0 && (
          <div className="w-full flex flex-wrap gap-2 mt-3">
            {value.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 border border-border-input rounded-md"
              >
                <h6 className="text-sm text-black font-normal">{item}</h6>
                <div
                  onClick={removeHandler}
                  value={item}
                  className="border-danger border cursor-pointer size-4 flex items-center justify-center rounded-full"
                >
                  <Cross />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
