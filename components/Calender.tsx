"use client"
import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function Calender({value, onChange, disabledDates}: {  value: Range,
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];}) {
  return (
   <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}
