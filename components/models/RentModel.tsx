"use client"
import React, { useMemo, useState } from 'react'
import Model from './Model'
import useRentModel from '@/hooks/useRentModel'
import Heading from '../Heading';
import Categories, { categories } from '../Categories';
import { it } from 'node:test';
import CategoryInput from '../CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../CountrySelect';
import dynamic from 'next/dynamic';

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
    const Map = useMemo(() => dynamic(() => import("../Map"), {ssr: false}), [location])
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
             shouldDirty: true,
             shouldTouch: true,
             shouldValidate: true
        });
    }

    const [step, setStep] = useState(steps.CATEGORY);

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

    const footerContent = (
        <div>
            
        </div>
    )

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
    <Model isOpen={rentModel.isOpen} title='Airbnb Your Home' onClose={rentModel.onClose} onSumbit={onForward} actionLabel={actionLabel} body={bodyContent} footer={footerContent} secondaryLabel={secondaryActionLable} secondaryAction={step === steps.CATEGORY ? undefined : onBack} />
  )
}
