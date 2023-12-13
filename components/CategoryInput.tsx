"use client"
import React from 'react'
import { IconType } from 'react-icons'

export default function CategoryInput({onClick, label, selected, icon: Icon}: {onClick: (value: string) => void, label: string, icon: IconType, selected?: boolean}) {
  return (
    <div className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black" : "border-neutral-200"}`} onClick={() => onClick(label)}>
       <Icon size={30} className='' />
       <div className='font-semibold'>{label}</div>
    </div>
  )
}
