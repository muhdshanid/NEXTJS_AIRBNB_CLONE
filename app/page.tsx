import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listings/ListingCard'
import { getCurrentUser, getListings } from '@/libs/actions'
import { IListingParams } from '@/types/types'


interface HomeProps {
  searchParams: IListingParams
}
export const Home = async ({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()
  if(listings.length === 0){
    return (
      <EmptyState showReset/>
    )
  } 
  return (
    <Container>
      <div className='pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          listings.map((listing) => {
            return (
              <ListingCard
              currentUser={currentUser}  key={listing.id} listing={listing}/>
            )
          })
        }
      </div>
    </Container>
  )
}
 