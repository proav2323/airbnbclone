"use client"
import Image from 'next/image'
import React from 'react'

export default function Avatar() {
  return (
    <div>
        <Image src="/images/placeholder.jpg" alt="avatar" className='rounded-full' height={30} width={30} />
    </div>
  )
}
