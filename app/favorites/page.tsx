import React from 'react'
import EmptyState from '@/components/EmptyState'
import ClientOnly from '@/components/ClientOnly'
import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import getFavListings from '@/actions/getFavListings';
import FavClient from '@/components/FavClient';

export default async function page() {
      const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <ClientOnly>
            <EmptyState title="Unauthrozied" subTitle="Plaes Login" />
        </ClientOnly>
    )
  }

  const listings = await getFavListings();

  if (listings.length === 0 || !listings) {
        return (
        <ClientOnly>
            <EmptyState title="no favorites found" subTitle="looks like you have no favorites listings" />
        </ClientOnly>
    )
  }
  return (
    <ClientOnly>
        <FavClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}
