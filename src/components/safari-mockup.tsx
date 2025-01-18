import React from 'react'
import { ChevronLeft, ChevronRight, Share, LayoutGrid, Search } from 'lucide-react'
import Image from 'next/image'

export function SafariMockup() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-200 !mt-[4rem]">
      {/* Content Area */}
      <div className="h-96 bg-white p-6 flex items-center justify-center">
        <div className="relative w-full max-w-2xl h-[400px]">
          <Image
            src="https://d1.awsstatic.com/product-marketing/Rekognition/Image%20for%20facial%20analysis.3fcc22e8451b4a238540128cb5510b8cbe22da51.jpg"
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

