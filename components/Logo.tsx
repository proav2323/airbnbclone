"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Logo() {
  return (
    <div>
        <Image alt="logo" className='hidden md:block cursor-pointer' width={100} height={100} src="/images/logo.png"
         />
    </div>
  )
}
