import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("unauthroized", { status: 401 });
  }

  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return new NextResponse("not all fields are send", { status: 404 });
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate: startDate,
          endDate: endDate,
          totalPrice: totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
