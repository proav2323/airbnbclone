"use client"
import React, {useCallback} from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any
}

export default function ImageUploads({onChange, value}: {onChange: (value: string) => void, value: string}) {

    const handleUplaod = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])

  return (
    <CldUploadWidget onUpload={handleUplaod} uploadPreset='use this' options={{maxFiles: 1}} >
        {({open}) => {
            return (
                <div onClick={() => open?.()} className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600'>
                   <TbPhotoPlus size={50} />
                   <div className='font-semibold text-lg'>click top upload</div>
                   {value && (
                    <div className='abosolue inset-0 w-full h-full'>
                        <Image src={value} fill style={{objectFit: "cover"}} alt="chosen image" />
                    </div>
                   )}
                </div>
            )
        }}
    </CldUploadWidget>
  )
}
