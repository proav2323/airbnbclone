import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser'
import getListings from '@/actions/getListings'
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import PropertyClient from '@/components/PropertyClient';

export default async function page() {
const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <ClientOnly>
            <EmptyState title="Unauthrozied" subTitle="Plaes Login" />
        </ClientOnly>
    )
  }

  const listings = await getListings({userId: currentUser.id});

  if (listings.length === 0) {
        return (
        <ClientOnly>
            <EmptyState title="no properties fiund" subTitle="looks like you have no properties" />
        </ClientOnly>
    )
  }

  return (
    <ClientOnly>
       <PropertyClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}
