"use client"
import React, { ReactElement, useCallback } from 'react'
import { IconType } from 'react-icons'
import {useRouter, useSearchParams} from 'next/navigation'
import qs from 'query-string'

export default function CategoryBox({label, icon: Icon, description, selected}: {label: string, icon: IconType , description: string, selected?: boolean}) {

  const router = useRouter();
  const params = useSearchParams();

const handelClick = useCallback(() => {
  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString())
  }
   
  const updatedQuery: any = {
    ...currentQuery,
    category: label
  }

  if (params?.get("category") === label) {
    delete updatedQuery.category;
  }

  const url = qs.stringifyUrl({
    url: "/",
    query: updatedQuery
  }, {skipNull: true});

  router.push(url);
}, [params, label, router])


  return (
    <div className={`flex flex-col items-center justify-center gap-3 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? "border-b-neutral-800" : "border-transparent"} ${selected ? "text-neutral-800" : "text-neutral-500"}`} onClick={handelClick}>
      <Icon size={26} />
      <div className='font-meduim text-sm'>{label}</div>
    </div>
  )
}
