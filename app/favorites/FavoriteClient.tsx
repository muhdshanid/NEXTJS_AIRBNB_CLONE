"use client"

import Container from "@/components/Container"
import Heading from "@/components/Heading"
import ListingCard from "@/components/listings/ListingCard"
import { FavoriteClientProps } from "@/types/types"


const FavoriteClient = ({
    listings,
    currentUser
}: FavoriteClientProps) => {
  return (
    <Container>
        <Heading title="Favorites" subtitle="List of places you have favorited"/>
        <div className='grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {
                listings.map(listing => (
                    <ListingCard currentUser={currentUser}
                    key={listing.id} 
                    listing={listing}/>
                ))
            }
        </div>
    </Container>
  )
}

export default FavoriteClient