import useFav from '@/hooks/useFav';
import { saveUser } from '@/types'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function HeartButton({listingId, currentUser}: {listingId: string, currentUser?: saveUser | null}) {
  const {hasFav, toggleFav} = useFav({listingId: listingId, currentUser: currentUser});
    const hasFavorited = hasFav;
    const toggleFavorite = toggleFav;
  return (
    <div onClick={toggleFavorite} className='relative hover:opacity-80 cursor-pointer transition'>
       <AiFillHeart size={24} className={`absolute top-[2px] right-[2px] ${hasFavorited ? "fill-rose-500": "fill-neutral-500/70"}`} />
    </div>
  )
}
