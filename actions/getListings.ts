import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDb";

export interface IlISTINGSpROPS {
  userId?: string;
}

export default async function getListings(params: IlISTINGSpROPS) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (err: any) {
    throw new Error();
  }
}
