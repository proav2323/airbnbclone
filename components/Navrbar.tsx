"use client"
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { User } from '@prisma/client'
import { saveUser } from '@/types'
import Categories from './Categories'
import Loader from './Loader'

export default function Navrbar({currentUser}: {currentUser?: saveUser | null}) {
  return (
    <div className='fined w-full shadow-sm bg0white z-10'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                   <Logo />
                   <Search />
                   <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}
