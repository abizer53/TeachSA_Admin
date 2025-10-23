import React, { useEffect } from 'react';

export default function LargePhotoModal({ source, handler }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handler?.(); // Safely call onClose when ESC is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handler]);

  return (
    <div className='modal-container fixed inset-0 flex justify-center items-center bg-black/70 z-50'>
      <div className='w-11/12 sm:w-3/4 max-h-[90vh] relative'>
        {/* Close button */}
        <button
          onClick={handler}
          className='absolute -top-4 -right-4 bg-white size-12 rounded-full flex justify-center items-center hover:bg-gray-200 transition'
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Image */}
        <img src={source} alt="Large" className='w-full aspect-video rounded-lg' />
      </div>
    </div>
  );
}
