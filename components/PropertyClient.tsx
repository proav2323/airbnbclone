"use client";
import { SafeListing, SafeReservation, saveUser } from "@/types";
import { Listing, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import Container from "./Container";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "./ListingCard";

export default function PropertyClient({
  listings,
  currentUser,
}: {
  listings: Listing[] | SafeListing[];
  currentUser?: saveUser | null;
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("proptery deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err.respons.data);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="properties" subtitle="list of properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-colo-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((res) => (
          <ListingCard
            key={res.id}
            data={res}
            actionId={res.id}
            onAction={onCancel}
            disabled={deletingId === res.id}
            actionLabel="delete Property"
            currentUser={currentUser}
            isFav={false}
          />
        ))}
      </div>
    </Container>
  );
}
