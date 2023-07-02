"use client"
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import { ReservationClientProps } from '@/types/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

const ReservationClient = ({
    currentUser,
    reservations
}: ReservationClientProps) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState("")
    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`).then(() =>{
            toast.success("Reservation cancelled")
            router.refresh()
        }).catch(err => toast.error("Something went wrong"))
        .finally(() => setDeletingId(""))
    },[router])
  return (
    <Container>
        <Heading title='Reservations' subtitle='Booking on your properties'/>
        <div className='grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {
                reservations.map(reservation => (
                    <ListingCard key={reservation.id}
                    listing={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel='Cancel guest reservation'
                    currentUser={currentUser}/>
                ))
            }
        </div>
    </Container>
  )
}

export default ReservationClient