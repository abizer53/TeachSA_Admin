import React, { useEffect, useRef, useState } from 'react';
import DownArrow from '../../public/icons/DownArrow';

export default function Dropdown(props) {
  const [value, setValue] = useState(props.placeholder);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handler = (e) => {
    const val = e.currentTarget.getAttribute('value');
    const val2 = e.currentTarget.getAttribute('id');
    setValue(val);
    props.handler(val, val2);
    setShow(false); // close dropdown after selection
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  return (
    <div
      ref={dropdownRef}
      className={`w-full relative flex items-center justify-between p-2 border border-solid border-border-input bg-white ${
        show ? 'rounded-sm' : 'rounded-md'
      }`}
      onClick={() => setShow(!show)}
    >
      <h5
        className={`text-sm font-normal w-full cursor-pointer ${
          props.placeholder !== value ? 'text-black' : 'text-placeholder'
        }`}
      >
        {value}
      </h5>

      <div className={`cursor-pointer transition-transform ${show ? 'rotate-180' : ''}`}>
        <DownArrow />
      </div>

      {show && (
        <div className="border dropdown bg-white border-solid border-border-input rounded-sm absolute w-full left-0 top-12 max-h-48 overflow-y-auto z-50">
          {props.data?.map((item, index) => (
            <h5
              key={index}
              value={item.value}
              id={item.id}
              onClick={handler}
              className="text-sm font-normal text-black px-4 py-2 hover:bg-green-light cursor-pointer"
            >
              {item.value}
            </h5>
          ))}
          {props.data?.length === 0 && (
            <h5 className="text-sm font-normal text-black px-4 py-2 cursor-pointer">
              No data found
            </h5>
          )}
        </div>
      )}
    </div>
  );
}
