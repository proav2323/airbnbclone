"use client"
import useCountries from '@/hooks/useCountries'
import { saveUser } from '@/types'
import React from 'react'
import Heading from './Heading';
import Image from 'next/image';
import HeartButton from './HeartButton';

export default function ListingHead({title, currentUser, id, src, locationValue}: {title: string, currentUser?: saveUser | null, id: string, src: string, locationValue: string}) {
    const {getByValue} = useCountries();

    const location = getByValue(locationValue);
  return (
    <>
        <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
        <div className='w-full h-[60vh] overflow-hidden rounded-lg relative'>
            <Image src={src} alt="" fill className='object-cover w-full' />
            <div className="absolute top-5 right-5">
                <HeartButton listingId={id} currentUser={currentUser} />
            </div>
        </div>
    </>
  )
}
