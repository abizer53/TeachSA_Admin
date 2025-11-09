import React from 'react'
import Button from '@/components/Button'

export default function VerificationStatusModal({ status, onClose, onRetry, loading }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <div className="text-center">
          <h2 className={`text-xl font-semibold mb-3 ${status?.color}`}>{status?.msg}</h2>
          <p className="text-gray-700 mb-5">{status?.description}</p>

          {status?.retry && (
            <Button variant="green" loading={loading} onClick={onRetry} className="w-full mb-3">
              Try Again
            </Button>
          )}
          <Button variant="yellow" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
