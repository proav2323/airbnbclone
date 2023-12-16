import prisma from "@/libs/prismaDb";

interface iParams {
  listingId?: string;
}

export default async function getListingById({ params }: { params: iParams }) {
  try {
    const { listingId } = params;

    const listing = prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (err: any) {
    throw new Error(err);
  }
}
