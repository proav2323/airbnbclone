"use client"
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

export default function Navrbar() {
  return (
    <div className='fined w-full shadow-sm bg0white z-10'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                   <Logo />
                   <Search />
                   <UserMenu />
                </div>
            </Container>
        </div>
    </div>
  )
}
