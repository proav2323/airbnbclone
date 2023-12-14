import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const body = await req.json();
  const {
    category,
    location,
    imageSrc,
    title,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    price,
  } = body;

  if (
    !category ||
    !location ||
    !imageSrc ||
    !title ||
    !description ||
    !roomCount ||
    !guestCount ||
    !bathroomCount ||
    !price
  ) {
    return new NextResponse(`some values is missing`, {
      status: 404,
    });
  }

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      title,
      description,
      imageSrc,
      price: parseInt(price, 10),
      roomCount,
      bathroomCount,
      guestCount,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
