import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import React from 'react'
import TripsClient from "@/components/TripsClient";

export default async function page() {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <ClientOnly>
            <EmptyState title="Unauthrozied" subTitle="Plaes Login" />
        </ClientOnly>
    )
  }

  const reservations = await getReservations({userId: currentUser.id});

  if (reservations.length === 0) {
        return (
        <ClientOnly>
            <EmptyState title="no trips found" subTitle="looks like you haven't reserved any trips" />
        </ClientOnly>
    )
  }

  return (
    <ClientOnly>
       <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}
