"use client"
import React from 'react'
import axios from "axios"
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import useRegisterModel from '@/hooks/useRegisterModel'
import Model from './Model'

export default function RegisterModel() {

    const registerModel = useRegisterModel();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data).then(() => {
            registerModel.onClose();
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            body
        </div>
    )

    const footerContent = (
        <div>
            footer
        </div>
    )

  return (
   <Model disabled={isLoading} isOpen={registerModel.isOpen} title='Register' actionLabel='Continue' onClose={registerModel.onClose} onSumbit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
  )
}
