"use client"
import useCountries from '@/hooks/useCountries'
import { User } from '@prisma/client'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from './Avatar'
import ListingCategory from './ListingCategory'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import("../components/Map"), {ssr: false});

export default function ListingInfo({user, description, roomCount, bathroomCount, guestCount, category, locationValue}: {user: User, description: string, roomCount: number, guestCount: number, bathroomCount: number, category: {
    icon: IconType,
    label: string,
    description: string
} | undefined, locationValue: string}) {
    const {getByValue} = useCountries();

    const location = getByValue(locationValue);
  return (
    <div className='col-span-4 flex flex-col gap-8'>
       <div className='flex flex-col gap-2'>
         <div className='text-xl font-semibold flex flex-row items-center gap-2'>
            <div>Hosted By {user?.name}</div>
            <Avatar src={user?.image} />
         </div>
         <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
            <div>{guestCount} Guests</div>
            <div>{roomCount} Rooms</div>
            <div>{bathroomCount} Bathrooms</div>
         </div>
       </div>
       <hr />
       {category && (
        <ListingCategory icon={category.icon} label={category.label} description={category.description} />
       )}
       <hr />
       <div className='text-lg font-light text-neutral-500'>
          {description}
       </div>
       <hr />
       <Map center={location?.latlng} label={location?.label} />
    </div>
  )
}
