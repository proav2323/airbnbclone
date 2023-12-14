"use client"
import React, { useMemo, useState } from 'react'
import Model from './Model'
import useRentModel from '@/hooks/useRentModel'
import Heading from '../Heading';
import Categories, { categories } from '../Categories';
import { it } from 'node:test';
import CategoryInput from '../CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../Counter';
import ImageUploads from '../ImageUploads';
import Input from '../Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation'

export default function RentModel() {
    const rentModel = useRentModel();
    const {register, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        }
    });
    enum steps {
        CATEGORY = 0,
        LOCATION = 1,
        INFO = 2,
        IMAGES = 3,
        DESCRIPTION = 4,
        PRICE = 5
    }

    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");
    const router = useRouter();
    const Map = useMemo(() => dynamic(() => import("../Map"), {ssr: false}), [location])
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
             shouldDirty: true,
             shouldTouch: true,
             shouldValidate: true
        });
    }

    const [step, setStep] = useState(steps.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const onBack = () => {
        if (step > 0) {
        setStep((value) => value - 1);
        }
    }

    const onForward = () => {
        if (step < steps.PRICE) {
          setStep((value) => value + 1);
        }
    }

    const onSumbit: SubmitHandler<FieldValues> = (data) => {
        if (step !== steps.PRICE) {
            return onForward();
        }

        setIsLoading(true);
        axios.post("api/listings", data).then(() => {
            toast.success("listing created!");
            router.refresh();
            reset();
            setStep(steps.CATEGORY);
            rentModel.onClose();
        }).catch((err) => {
            toast.error(err.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }


    let bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading title='Which of this best describes your place?' subtitle='pick a category' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {categories.map((item) => (
                <CategoryInput key={item.label} onClick={(value: string) => setCustomValue("category", value)} selected={category === item.label} label={item.label} icon={item.icon} />
            ))}
          </div>
        </div>
    )

    if (step === steps.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
              <Heading title='Where is your place located' subtitle='help us find you' />
              <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />
              <Map center={location?.latlng} label={location?.label} />
            </div>
        );
    }

    if (step === steps.INFO) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
              <Heading title='share some basics about your place' subtitle='what amenities do you have?' />
              <Counter title='Guests' subTitle='how many guests do you allow?' value={guestCount} onChange={(value: number) => setCustomValue("guestCount", value)} />
              <hr />
              <Counter title='rooms' subTitle='how many rooms do you have?' value={roomCount} onChange={(value: number) => setCustomValue("roomCount", value)} />
              <hr />
              <Counter title='bathrooms' subTitle='how many bathrooms do you have?' value={bathroomCount} onChange={(value: number) => setCustomValue("bathroomCount", value)} />
              <hr />
        </div>
      )
    }

    if (step === steps.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
              <Heading title='add a photo of your place' subtitle='show your guests what your place looks like!' />
              <ImageUploads value={imageSrc} onChange={(value: string) => setCustomValue("imageSrc", value)} />
            </div>
        )
    }

    if (step === steps.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
              <Heading title='how would describe your place' subtitle='short and sweet works best!' />
              <Input id='title' label='Title' register={register} disabled={isLoading} errors={errors} required />
              <hr />
              <Input id='description' label='Description' register={register} disabled={isLoading} errors={errors} required />
            </div>
        )
    }

    if (step === steps.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
              <Heading title='now set your price' subtitle='how much you charge for a night' />
              <Input id="price" label='Price' formatPrice register={register} errors={errors} disabled={isLoading} type='number' />
            </div>
        )
    }

    const actionLabel = useMemo(() => {
        if (step === steps.PRICE) {
            return "Create"
        } else {
            return "Next"
        }
    }, [step, steps])

    const secondaryActionLable = useMemo(() => {
        if (step === steps.CATEGORY) {
            return undefined
        } else {
            return "Back"
        }
    }, [steps, step])
  return (
    <Model isOpen={rentModel.isOpen} title='Airbnb Your Home' onClose={rentModel.onClose} onSumbit={handleSubmit(onSumbit)} actionLabel={actionLabel} body={bodyContent} secondaryLabel={secondaryActionLable} secondaryAction={step === steps.CATEGORY ? undefined : onBack} />
  )
}
