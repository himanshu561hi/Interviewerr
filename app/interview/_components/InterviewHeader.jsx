import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className="p-4 shadow-sm">
        <Image src="/logo.png" alt="Logo" width={150} height={80} 
        className="w-[150px]" />
    </div> 
  ) 
}

export default InterviewHeader