"use client"
import { useCountries } from '@/hooks/useCountries'
import { ListingCardProps } from '@/types/types'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import HeartButton from '../HeartButton'
import Button from '../Button'

const ListingCard = ({
    onAction,
    actionId = "",
    actionLabel,
    listing,
    disabled,
    currentUser,
    reservation,

}: ListingCardProps) => {
    const router = useRouter()
    const {getByValue} = useCountries()
    const location = getByValue(listing.locationValue)
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

        e.stopPropagation()
        if(disabled) return 

        onAction?.(actionId)
    },[disabled, actionId, onAction])

    const price = useMemo(() => {
        if(reservation){
            return reservation.totalPrice
        }
        return listing.price
    },[listing.price, reservation])

    const reservationDate = useMemo(() => {
        if(!reservation) return null

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, "PP")} - ${format(end, "PP")}`
    },[reservation])
  return (
    <div className='col-span-1 cursor-pointer group' onClick={() => router.push(`/listings/${listing.id}`)}>
        <div className='flex flex-col gap-2 w-full'>
            <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
                <Image fill alt='listing' src={listing.imageSrc} 
                className='object-cover h-full w-full group-hover:scale-110 transition'/>
                <div  className='absolute top-3 right-3'>
                    <HeartButton listingId={listing.id}
                    currentUser={currentUser}/>
                </div>
            </div>
            <div className='font-semibold text-lg'>
                {location?.region}, {location?.label}
            </div>
            <div className='font-light text-neutral-500'>
                {reservationDate || listing.category}
            </div>
            <div className='flex flex-row items-center gap-1'>
                <div className='font-semibold'>
                    ${price}
                </div>
                {!reservation && (
                    <div className='font-light '>night</div>
                )}
            </div>
            {
                onAction && actionLabel && (
                    <Button disabled={disabled} small onClick={handleCancel} label={actionLabel}/>
                )
            }
        </div>
    </div>
  )
}

export default ListingCard