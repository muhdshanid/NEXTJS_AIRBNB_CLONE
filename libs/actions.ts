import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb'
import { authOptions } from "./session";


interface IListingParams {

    userId?: string,
    startDate?: string,
    endDate?: string,
    locationValue?: string,
    category?: string,
    guestCount?: number,
    roomCount?: number,
    bathroomCount?: number,
}

export const getSession = async () => {
    return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {

    try {
        
        const session = await getSession()
        if(!session?.user?.email){
            return null
        }
        
        const currentUser = await prisma.user.findUnique({where: {email: session.user.email as string}})
        if(!currentUser){
            return null
        }

        return {...currentUser, createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(), emailVerified: currentUser.emailVerified?.toISOString() || null}
    } catch (error) {
        return null
    }
}

export const getListings = async (params: IListingParams) => {
    

    try {
        const {userId, startDate, endDate, roomCount, bathroomCount, locationValue, guestCount, category} = params

        let query: any = {}

        if(userId){
            query.userId = userId
        }

        if(category){
            query.category = category
        }
        if(locationValue){
            query.locationValue = locationValue
        }
        if(roomCount){
            query.roomCount = {
                gte: +roomCount
            }
        }
        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }
        if(bathroomCount){
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if(startDate && endDate){
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate},
                                startDate: {lte: startDate}
                            }, 
                            {
                                startDate: {lte: startDate},
                                endDate: { gte: startDate}
                            }
                        ]
                    }
                }
            }
        }
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
            createdAt: "desc"
        }})

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))
        return safeListings
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getListingById = async (params: {listingId?: string}) =>{

    try {
        const {listingId} = params

        const listing = await prisma.listing.findUnique({
            where: { id: listingId},
            include: {
                user: true
            }
        })

        if(!listing) return null

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user, 
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getReservations = async (params: {listingId?: string, authorId?: string, userId?: string}) => {

    try {
        
    
    const { listingId, authorId, userId} = params

    const query: any = {}

    if(listingId) {
        query.listingId = listingId
    }
    if(userId) {
        query.userId = userId
    }
    if(authorId) {
        query.listing = { userId: authorId}
    }

    const reservations = await prisma.reservation.findMany({where: query, include: {
        listing: true
    }, orderBy: {
        createdAt: "desc"
    }})

    const safeReservations = reservations.map(reservation => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString()
        }
    }))
    return safeReservations
} catch (error: any) {
        throw new Error(error)
}
}

export const getFavoriteListings = async () => {

    try {
        const currentUser = await getCurrentUser()

        if(!currentUser) return []

        const favorites = await prisma.listing.findMany({where: {id: {
            in: [...(currentUser.favoriteIds || [])]
        }}})

        const safeFavorites = favorites.map(fav => ({
            ...fav,
            createdAt: fav.createdAt.toISOString()
        }))

        return safeFavorites
    } catch (error: any) {
        throw new Error(error)
    }
}