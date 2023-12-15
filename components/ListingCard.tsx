"use client"
import { Listing, Reservation, User } from '@prisma/client'
import React, { useCallback, useMemo } from 'react'
import {saveUser} from '@/types/index'
import {useRouter} from "next/navigation"
import useCountries from '@/hooks/useCountries'
import Image from "next/image"
import {format} from 'date-fns'
import HeartButton from './HeartButton'
import Button from './Button'

export default function ListingCard({data, currentUser, reservation, onAction, disabled, actionId = "", actionLabel}: {data: Listing, currentUser?: saveUser | null, reservation?: Reservation, onAction?: (id: string) => void, disabled?: boolean, actionLabel?: string, actionId?: string}) {
  const router = useRouter();
  const {getByValue} = useCountries();
  const location = getByValue(data.locationValue);

  const handelCancel = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (disabled) {
          return;
        }

        onAction?.(actionId);
  }, [disabled, onAction, actionId])

  const price = useMemo(() => {
    if (reservation) {
       return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation){
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`
    
  }, [reservation])

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)} className='col-span-1 cursor-pointer group'>
       <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-lg">
          <Image fill src={data.imageSrc} alt="listing image" className='object-cover h-full w-full group-hover:scale-110 transition' />
          <div className='absoluet top-3 right-3'>
             <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
                <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onclick={handelCancel}
          />
        )}
       </div>
    </div>
  )
}
