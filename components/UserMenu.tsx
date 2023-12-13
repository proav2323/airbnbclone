"use client"
import React, { useCallback, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar'
import MenuItem from './MenuItem';
import useRegisterModel from '@/hooks/useRegisterModel';
import useLoginModel from '@/hooks/useLoginModel';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { saveUser } from '@/types';
import useRentModel from '@/hooks/useRentModel';

export default function UserMenu({currentUser}: {currentUser?: saveUser | null}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
          setIsOpen(prev => !prev);
    }, [])
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const rentModel = useRentModel();
    const onRent = useCallback(() => {
      if (!currentUser) {
        return loginModel.onOpen();
      }

      rentModel.onOpen();
    }, [loginModel, currentUser, rentModel])
  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3 '>
            <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer ' onClick={onRent}>
                 Airbnb Your Home
            </div>
            <div className='p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' onClick={toggleOpen}>
              <AiOutlineMenu />
              <div className='hidden md:block'>
                  <Avatar src={currentUser?.image} />
              </div>
            </div>
        </div>
        {isOpen && (
            <div className='absolute rounded-lg  shadow-lg w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                      <>
                        <MenuItem onClick={() => {}} label="my Trips" />
                        <MenuItem onClick={() => {}} label="my Favorites" />
                        <MenuItem onClick={() => {}} label="my Reservations" />
                        <MenuItem onClick={() => {}} label="my Properties" />
                        <MenuItem onClick={onRent} label="Airbnb my home" />
                        <hr />
                        <MenuItem onClick={() => signOut()} label="Logout" />
                      </>
                    ) : (
                      <>
                        <MenuItem onClick={loginModel.onOpen} label="Login" />
                        <MenuItem onClick={registerModel.onOpen} label="Sign Up" />
                      </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}
