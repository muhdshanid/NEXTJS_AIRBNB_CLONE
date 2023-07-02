import EmptyState from '@/components/EmptyState'
import { getCurrentUser, getListings } from '@/libs/actions'
import React from 'react'
import TripsClient from './PropertiesClient'
import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <EmptyState title='unauthorized' subtitle='Please login'/>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if(listings.length === 0){
        <EmptyState title="No properties found" subtitle='Looks like you have no properties'/>
    }
  return (
    <PropertiesClient  currentUser={currentUser}
    listings={listings}
    />
  )
}

export default PropertiesPage