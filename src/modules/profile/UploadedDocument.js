import React, { useEffect, useState } from 'react'
import File from '../../../public/icons/File'
import Button from '@/components/Button'
import Download from '../../../public/icons/Download'
import Link from '@/components/Link'

// Optional: you can add specific icons for Excel, Word, etc., if available
// import ExcelIcon from '../../../public/icons/Excel'
// import WordIcon from '../../../public/icons/Word'
// import PdfIcon from '../../../public/icons/Pdf'

export default function UploadedDocument({ title, url }) {
  const [fileType, setFileType] = useState('')

  useEffect(() => {
    if (url) {
      const ext = url.split('.').pop().toLowerCase()
      setFileType(ext)
    }
  }, [url])

  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileType)
  const isPDF = fileType === 'pdf'
  const isExcel = ['xls', 'xlsx', 'csv', 'ods'].includes(fileType)
  const isWord = ['doc', 'docx', 'rtf', 'odt'].includes(fileType)

  const renderPreview = () => {
    if (isImage) {
      return (
        <img
          src={url}
          alt={title}
          loading='lazy'
          className="w-full rounded-md object-cover mt-5 h-40 border"
        />
      )
    } else if (isPDF) {
      return (
        <iframe
          src={url}
          title={title}
          className="w-full rounded-md border mt-5 h-40"
        />
      )
    } else if (isExcel) {
      return (
        <div className="w-full rounded-md border mt-5 h-40 flex flex-col items-center justify-center bg-gray-50 text-gray-600">
          {/* <ExcelIcon /> */}
          <File />
          <p className="text-sm mt-2">Excel Sheet: {title}.{fileType}</p>
        </div>
      )
    } else if (isWord) {
      return (
        <div className="w-full rounded-md border mt-5 h-40 flex flex-col items-center justify-center bg-gray-50 text-gray-600">
          {/* <WordIcon /> */}
          <File />
          <p className="text-sm mt-2">Word Document: {title}.{fileType}</p>
        </div>
      )
    } else {
      return (
        <div className="w-full rounded-md border mt-5 h-40 flex flex-col items-center justify-center bg-gray-50 text-gray-600">
          <File />
          <p className="text-sm mt-2">Unsupported File Type: {title}.{fileType}</p>
        </div>
      )
    }
  }

  return (
    <div className="shadow-searchbox p-5 rounded-md w-full">
      <div className="flex gap-2 items-center">
        <File />
        <h5 className="text-input-label font-medium text-sm">{title}</h5>
      </div>

      {renderPreview()}

      <Link href={url} target="_blank" rel="noreferrer">
        <Button
          variant={'green'}
          className="flex items-center gap-2 mt-3 hover:no-underline"
        >
          <Download />
          Download
        </Button>
      </Link>
    </div>
  )
}
