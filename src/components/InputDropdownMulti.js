import React, { useEffect, useState, useRef } from 'react'
import DownArrow from '../../public/icons/DownArrow'
import Cross from '../../public/icons/Cross'

export default function InputDropdownMulti(props) {
  const [inputValue, setInputValue] = useState('')
  const [selectedValues, setSelectedValues] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const valueHandler = (e) => {
    const val = e.target.value
    setInputValue(val)
    setShowDropdown(val.length > 0)
  }

  const selectHandler = (e) => {
    e.stopPropagation()
    const newValue = e.currentTarget.getAttribute('value')
    if (!selectedValues.includes(newValue)) {
      const updatedValues = [...selectedValues, newValue]
      setSelectedValues(updatedValues)
      props.handler(updatedValues)
    }
    setInputValue('')
    setShowDropdown(false)
  }

  const removeHandler = (e) => {
    e.stopPropagation()
    const valueToRemove = e.currentTarget.getAttribute('value')
    const updatedValues = selectedValues.filter((value) => value !== valueToRemove)
    setSelectedValues(updatedValues)
    props.handler(updatedValues)
  }

  useEffect(() => {
    if (props.defaultValue) {
      const s1 = props.defaultValue.split(',')
      setSelectedValues(s1)
    }
  }, [props.defaultValue])

  // ✅ Auto-close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div ref={dropdownRef} className={`w-full relative bg-transparent`}>
        <div className={`flex items-center justify-between p-2 ${props.classes}`}>
          <input
            type="text"
            value={inputValue}
            placeholder={props.placeholder}
            onChange={valueHandler}
            onClick={() => setShowDropdown(true)}
            className={`text-sm bg-transparent outline-none pl-2 font-normal w-5/6 text-black placeholder-shown:text-placeholder`}
          />
          <div
            onClick={(e) => {
              e.stopPropagation()
              setShowDropdown(!showDropdown)
            }}
            className={`cursor-pointer transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
          >
            <DownArrow />
          </div>
        </div>

        {showDropdown && (
          <div className="border dropdown bg-white border-solid border-border-input rounded-md absolute w-full left-0 top-12 max-h-48 overflow-y-auto z-50">
            {props.data?.map(
              (item, index) =>
                item.value.toLowerCase().includes(inputValue.toLowerCase()) && (
                  <h5
                    key={index}
                    id={item.id}
                    value={item.value}
                    onClick={selectHandler}
                    className="text-sm font-normal text-black px-4 py-2 hover:bg-green-light cursor-pointer"
                  >
                    {item.value}
                  </h5>
                )
            )}
          </div>
        )}
      </div>

      {selectedValues.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 mt-3">
          {selectedValues.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 border border-border-input rounded-md"
            >
              <h6 className="text-sm text-black font-normal">{item}</h6>
              <div
                onClick={removeHandler}
                value={item}
                className="border-danger border cursor-pointer size-4 flex items-center justify-center rounded-full cross"
              >
                <Cross />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
