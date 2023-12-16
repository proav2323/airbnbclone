import EmptyState from '@/components/EmptyState'
import ClientOnly from '@/components/ClientOnly'
import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import React from 'react'
import ResversationsClient from '@/components/ResversationsClient'

export default async function page() {
   
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <ClientOnly>
            <EmptyState title="Unauthrozied" subTitle="Plaes Login" />
        </ClientOnly>
    )
  }

  const reservations = await getReservations({authorId: currentUser.id});

  if (reservations.length === 0) {
        return (
        <ClientOnly>
            <EmptyState title="no reservations found" subTitle="looks like you haveno reservatiosn on your property" />
        </ClientOnly>
    )
  }

  return (
    <ClientOnly>
        <ResversationsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}
