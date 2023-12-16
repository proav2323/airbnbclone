import prisma from "@/libs/prismaDb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const fav = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return fav;
  } catch (Err: any) {
    throw new Error(Err);
  }
}
