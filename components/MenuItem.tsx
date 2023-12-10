"use client"
import React from 'react'

export default function MenuItem({onClick, label}: {onClick: () => void, label: string}) {
  return (
    <div className='px-4 py-3 hover:bg-neutral-100  transition font-semibold' onClick={onClick}>{label}</div>
  )
}
