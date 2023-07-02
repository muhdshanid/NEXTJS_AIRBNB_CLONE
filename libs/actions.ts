import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb'
import { authOptions } from "./session";



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

export const getListings = async () => {
    
    try {
        
        const listings = await prisma.listing.findMany({orderBy: {
            createdAt: "desc"
        }})

        return listings
    } catch (error: any) {
        throw new Error(error)
    }
}