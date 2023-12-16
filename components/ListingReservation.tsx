"use client"
import React from 'react'
import {Range} from "react-date-range"
import Button from './Button'
import Calender from "./Calender"

export default function ListingReservation({price, totalPrice, onChangeDate, onSumbit, dateRange, disabled, disabledDates}: {price: number, totalPrice: number, onChangeDate: (value: Range) => void, dateRange: Range 
onSumbit: () => void, disabled?: boolean, disabledDates: Date[]}) {
  return (
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {price}
        </div>
        <div className="font-light text-neutral-600">
          night
        </div>
      </div>
      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onclick={onSumbit}
        />
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>
    </div>
  )
}
