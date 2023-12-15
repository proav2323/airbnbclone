import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismaDb";

interface IParams {
  listingId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const id = params.listingId;

  if (!id || typeof id !== "string") {
    return new NextResponse("invalid id", { status: 402 });
  }

  let favIds = [...(currentUser.favoriteIds || [])];

  favIds.push(id);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const id = params.listingId;

  if (!id || typeof id !== "string") {
    return new NextResponse("invalid id", { status: 402 });
  }

  let favIds = [...(currentUser.favoriteIds || [])];

  favIds = favIds.filter((item) => item !== id);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favIds,
    },
  });

  return NextResponse.json(user);
}
