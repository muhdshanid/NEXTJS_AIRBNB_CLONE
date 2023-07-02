import EmptyState from '@/components/EmptyState'
import { getCurrentUser, getReservations } from '@/libs/actions'
import React from 'react'
import ReservationClient from './ReservationClient'

const ReservationsPage =  async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        <EmptyState title='unauthorized' subtitle='Please login'/>
    }
    const reservations = await getReservations({
        authorId: currentUser?.id
    })
    if(reservations.length === 0){
        <EmptyState title='No reservations found' subtitle='Looks like you have no reservations yer'/>
    }
  return (
    <ReservationClient
    reservations={reservations}
    currentUser={currentUser}
    />
  )
}

export default ReservationsPage