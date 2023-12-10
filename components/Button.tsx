"use client"
import React from 'react'
import { IconType } from 'react-icons'

export default function Button({label, onclick, outlne, disabled, small, icon: Icon}: {label: string, onclick: (e: React.MouseEvent<HTMLButtonElement>) => void, disabled?: boolean, outlne?: boolean, small?: boolean, icon?: IconType}) {
  return (
    <button onClick={onclick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outlne ? "bg-white" : "bg-rose-500"} ${outlne ? "border-black" : "border-rose-500"} ${outlne ? "text-black" : "text-white"} ${small ? "py-1" : "py-3"} ${small ? "text-sm" : "text-md"} ${small ? "font-light" : "font-semibold"} ${small ? "border-[1px]" : "border-[2px]"}`}>
        {Icon && (
           <Icon size={24} className='absolute left-4 top-3' />
        )}
        {label}
    </button>
  )
}
