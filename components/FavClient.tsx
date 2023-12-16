"use client"
import React from 'react'
import Container from './Container'
import Heading from './Heading'
import { Listing } from '@prisma/client'
import { SafeListing, saveUser } from '@/types'
import ListingCard from './ListingCard'

export default function FavClient({listings, currentUser}: {listings: Listing[] | SafeListing[], currentUser?: saveUser | null}) {
  return (
        <Container>
         <Heading title='Reservations' subtitle='list of your favorites places' />
         <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-colo-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map((res) => (
                <ListingCard key={res.id} data={res} currentUser={currentUser} />
            ))}
        </div>
    </Container>
  )
}
