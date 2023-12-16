"use client"
import { SafeReservation, saveUser } from '@/types'
import { Listing, Reservation, User } from '@prisma/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { categories } from './Categories'
import Container from './Container'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'
import useLoginModel from '@/hooks/useLoginModel'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval, setDate } from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingReservation from './ListingReservation'
import { Range } from 'react-date-range'

const intialDateRange = {
startDate: new Date(),
endDate: new Date(),
key: "selection"
}

export default function ListingClient({listing, reservations = [], currentUser}: {listing: Listing & {
    user: User
}, currentUser?: saveUser | null, reservations?: SafeReservation[]}) {

    const loginModel = useLoginModel();
    const router = useRouter();

    const disabledDate = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((item : any) => {
           const range = eachDayOfInterval({start: new Date(item.startDate), end: new Date(item.endDate)});
           dates = [...dates, ...range];
        })
    return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setToalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(intialDateRange);

    const onCreate = useCallback(() => {
        setIsLoading(true);
        if (!currentUser) {
            return loginModel.onOpen()
        }

        axios.post("/api/reservations", {
            totalPrice: totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success("success");
            setDateRange(intialDateRange);
            router.refresh();
        }).catch((err) => {
             toast.error(err.response.data)
        }).finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, currentUser, dateRange, listing.id, loginModel, router])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
           const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

           if (dayCount && listing.price) {
            setToalPrice(dayCount * listing.price);
           } else {
            setToalPrice(listing.price);
           }
        }
    }, [dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category])

  return (
    <Container>
    <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
             <ListingHead title={listing.title} src={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />
             <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                <div className='order-first mb-10 md:order-last md:col-span-3'>
                    <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value: Range) => setDateRange(value)} dateRange={dateRange} onSumbit={onCreate} disabled={isLoading} disabledDates={disabledDate} />
                </div>
             </div>
        </div>
    </div>
    </Container>
  )
}
