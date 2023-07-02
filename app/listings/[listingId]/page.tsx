import EmptyState from '@/components/EmptyState'
import { getCurrentUser, getListingById, getReservations } from '@/libs/actions'
import React from 'react'
import ListingClient from './ListingClient'

interface IParams {
    listingId?: string
}

const ListingPage =  async ({params}: { params: IParams}) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)
    if(!listing) {
        return (
            <EmptyState/>
        )
    }
  return (
    <ListingClient listing={listing}
    reservations={reservations}
    currentUser={currentUser}/>
  )
}

export default ListingPage