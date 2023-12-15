import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { saveUser } from "@/types";

import useLoginModel from "./useLoginModel";

interface iUseFav {
  listingId: string;
  currentUser?: saveUser | null;
}

const useFav = ({ listingId, currentUser }: iUseFav) => {
  const router = useRouter();
  const LoginModel = useLoginModel();
  const hasFav = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFav = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return LoginModel.onOpen();
      }

      try {
        let req;

        if (hasFav) {
          req = () => axios.delete(`/api/fav/${listingId}`);
        } else {
          req = () => axios.post(`/api/fav/${listingId}`);
        }

        await req();
        router.refresh();
        toast.success("Success");
      } catch (err: any) {
        toast.success(err.respons.data);
      }
    },
    [LoginModel, currentUser, hasFav, listingId, router]
  );

  return { hasFav, toggleFav };
};

export default useFav;
