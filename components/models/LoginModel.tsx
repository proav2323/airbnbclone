"use client"
import React from 'react'
import axios from "axios"
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import useRegisterModel from '@/hooks/useRegisterModel'
import Model from './Model'
import Heading from '../Heading'
import Input from '../Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import useLoginModel from '@/hooks/useLoginModel'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginModel() {

    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);
           if (callback?.ok) {
             toast.success("logged in")
             router.refresh();
             loginModel.onClose();
           }

           if (callback?.error) {
           toast.error(callback.error)
           }

        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back' subtitle='login to your Account' />
            <Input id="email" label='Email' disabled={isLoading} register={register} required errors={errors} />
            <Input id="password" type='password' label='Password' disabled={isLoading} register={register} required errors={errors} />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
           <hr></hr>
           <Button outlne label='Continue with Google' icon={FcGoogle} onclick={() => signIn("google")} />
           <Button outlne label='Continue with Github' icon={AiFillGithub} onclick={() => signIn("github")} />
           <div className='text-neutral-500 text-center mt-4 font-light'>
          <div className='flex flex-row items-center gap-2 justify-center'>
                <div>
                    Already Have An Account?
                </div>
                <div onClick={() => registerModel.onClose()} className='font-bold text-neutral-800 cursor-pointer hover:underline'>
                   Login
                </div>
            </div>
          </div>
        </div>
    )

  return (
   <Model disabled={isLoading} isOpen={loginModel.isOpen} title='Login' actionLabel='Continue' onClose={loginModel.onClose} onSumbit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
  )
}
