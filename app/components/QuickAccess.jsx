import React from 'react'
import Plus from '@/app/icons/Plus'
import Timer from '@/app/icons/Timer'
import Notes from '@/app/icons/Notes'
import Link from 'next/link'

const QuickAccess = () => {
  return (
    <>
      <div className="fixed end-6 bottom-6 group">
        <div className="flex opacity-0 flex-col items-center mb-4 space-y-2 transition-opacity duration-300 group-hover:opacity-100">
          <Link href='/timer' title='Timer' className="cursor-pointer flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-50">
            <Timer />
          </Link>
          <Link href='/' title='Notes' className="cursor-pointer flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-50">
            <Notes />
          </Link>
        </div>
        <button type="button" className="flex items-center justify-center text-white bg-[#35363e] rounded-full w-14 h-14 ">
          <Plus className="transition-transform group-hover:rotate-45" />
        </button>
      </div>
    </>
  )
}

export default QuickAccess
