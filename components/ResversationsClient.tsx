"use client"
import { SafeReservation, saveUser } from '@/types'
import React from 'react'
import toast from "react-hot-toast"
import axios from 'axios'
import { useState, useCallback } from 'react'
import {useRouter} from "next/navigation"
import Container from './Container'
import Heading from './Heading'
import ListingCard from './ListingCard'

export default function ResversationsClient({reservations, currentUser}: {reservations: SafeReservation[], currentUser?: saveUser | null}) {
        const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`).then(() => {
          toast.success("reservation canceled");
          router.refresh();
        }).catch((err) => {
            toast.error(err.respons.data);
        }).finally(() => {
            setDeletingId("")
        })
    }, [router])
  return (
    <Container>
         <Heading title='Reservations' subtitle='bookings on yours property' />
         <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-colo-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {reservations.map((res) => (
                <ListingCard key={res.id} data={res.listing} reservation={res} actionId={res.id} onAction={onCancel} disabled={deletingId === res.id} actionLabel='Cancel Guest Reservation' currentUser={currentUser} isFav={false} />
            ))}
        </div>
    </Container>
  )
}
