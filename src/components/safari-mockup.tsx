import React from 'react'
import { ChevronLeft, ChevronRight, Share, LayoutGrid, Search } from 'lucide-react'
import Image from 'next/image'

export function SafariMockup() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-200 !mt-[4rem]">
      {/* Title Bar */}
      <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white px-6 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-6">
          <ChevronLeft className="text-gray-400 hover:text-gray-600 transition-colors" size={20} />
          <ChevronRight className="text-gray-400 hover:text-gray-600 transition-colors" size={20} />
          <Share className="text-gray-400 hover:text-gray-600 transition-colors" size={20} />
        </div>
        <div className="flex-1 mx-6">
          <div className="bg-gray-100 rounded-full flex items-center px-4 py-2 shadow-inner">
            <Search className="text-gray-400 mr-3" size={16} />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="w-full bg-transparent outline-none text-sm text-gray-600"
              value="https://example.com"
              readOnly
            />
          </div>
        </div>
        <LayoutGrid className="text-gray-400 hover:text-gray-600 transition-colors" size={20} />
      </div>

      {/* Content Area */}
      <div className="h-96 bg-white p-6 flex items-center justify-center">
        <div className="relative w-full max-w-2xl h-[400px] mt-8">
          <Image
            src="https://framerusercontent.com/images/k2Lj2Kdwzj8butLpGw3tH9ZDtFQ.png?scale-down-to=1024"
            alt="Article to video conversion illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}

