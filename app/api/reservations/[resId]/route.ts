import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismaDb";

export async function DELETE(
  req: Request,
  { params }: { params: { resId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("unAuthrized", { status: 401 });
  }

  const reservationsId = params.resId;

  if (!reservationsId || typeof reservationsId !== "string") {
    return new NextResponse("inavlid id", { status: 402 });
  }

  const reservations = await prisma.reservation.deleteMany({
    where: {
      id: reservationsId,
      OR: [
        {
          userId: currentUser.id,
        },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
    },
  });

  return NextResponse.json(reservations);
}
