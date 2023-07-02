import EmptyState from '@/components/EmptyState'
import { getCurrentUser, getReservations } from '@/libs/actions'
import React from 'react'
import TripsClient from './TripsClient'

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <EmptyState title='unauthorized' subtitle='Please login'/>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if(reservations.length === 0){
        <EmptyState title="No trips found" subtitle='Looks like you have no trips'/>
    }
  return (
    <TripsClient  currentUser={currentUser}
    reservations={reservations}
    />
  )
}

export default TripsPage