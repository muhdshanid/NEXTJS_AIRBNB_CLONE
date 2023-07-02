import EmptyState from "@/components/EmptyState"
import { getCurrentUser, getFavoriteListings } from "@/libs/actions"
import FavoriteClient from "./FavoriteClient"

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        <EmptyState title='unauthorized' subtitle='Please login'/>
    }

    const favorites = await getFavoriteListings()
    if(favorites.length === 0){
        <EmptyState title="No favorites found" subtitle="Looks like you dont have favorites listings"/>
    }
  return (
    <FavoriteClient listings={favorites} currentUser={currentUser}/>
  )
}

export default FavoritesPage