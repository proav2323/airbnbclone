import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById'
import getReservations from '@/actions/getReservations';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import ListingClient from '@/components/ListingClient';
import React from 'react'

export default async function Listingpage({params}: {params: {
    listingId?: string
}}) {

  const listing = await getListingById({params: params});
  const currentUser = await getCurrentUser();
  const reservation = await getReservations(params);

  if (!listing) {
      return (
        <ClientOnly>
            <EmptyState />
        </ClientOnly>
      )
  }

  return (
    <ClientOnly>
        <ListingClient reservations={reservation} listing={listing} currentUser={currentUser} />
    </ClientOnly>
  )
}
