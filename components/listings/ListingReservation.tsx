"use client"

import { ListingReservationProps } from "@/types/types"
import Calender from "../inputs/Calendar"
import Button from "../Button"

const ListingReservation = ({
    price,
    totalPrice,
    dateRange,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200
    overflow-hidden">
        <div className="flex items-center gap-1 p-4">
            <div className="text-2xl font-semibold ">
                $ {price}
            </div>
            <div className="font-light text-neutral-600">night</div>
        </div>
        <hr />
        <Calender disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
         value={dateRange}/>
         <hr />
         <div className="p-4">
            <Button disabled={disabled} label="Reserve" 
            onClick={onSubmit}/>
         </div>
         <div className="p-4 flex items-center justify-between font-semibold text-lg">
            <div>Total</div>
            <div>
                $ {totalPrice}
            </div>
         </div>
    </div>
  )
}

export default ListingReservation