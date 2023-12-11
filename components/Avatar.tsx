"use client"
import Image from 'next/image'
import React from 'react'

export default function Avatar({src}: {src: string | undefined | null}) {
  return (
    <div>
        <Image src={src ? src :"/images/placeholder.jpg"} alt="avatar" className='rounded-full' height={30} width={30} />
    </div>
  )
}
