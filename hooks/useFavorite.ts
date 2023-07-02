import { SafeUser, UseFavorite } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userLoginModal } from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


export const useFavorite = ({listingId, currentUser}: UseFavorite) => {

    const router = useRouter()
    const loginModal = userLoginModal()
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        
        return list.includes(listingId)
    },[currentUser?.favoriteIds, listingId])

    const toggleFavorite = useCallback(async(e: React.MouseEvent<HTMLDivElement>) => {

        e.stopPropagation()
        if(!currentUser) {
            return loginModal.onOpen()
        }
        
        try {
            let req

            if(hasFavorited){
                req = () => axios.delete(`/api/favorites/${listingId}`)
            }else{
                req = () => axios.post(`/api/favorites/${listingId}`)
            }
            await req()
            router.refresh()
            toast.success("Success")
        } catch (error) {
            toast.error("Something went wrong")
        }
    },[currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited, 
        toggleFavorite
    }
}