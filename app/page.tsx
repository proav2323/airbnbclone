import getCurrentUser from '@/actions/getCurrentUser';
import getListings, { IListingsParams } from '@/actions/getListings';
import getReservations from '@/actions/getReservations';
import ClientOnly from '@/components/ClientOnly'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/ListingCard';
import { SafeReservation } from '@/types';
import { Listing, Reservation } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Home({searchParams}: {searchParams: IListingsParams}) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
         <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            ptt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              data={listing}
              key={listing.id}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
