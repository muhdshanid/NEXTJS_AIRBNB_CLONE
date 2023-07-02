import { getCurrentUser } from '@/libs/actions'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export const POST = async (req: Request) => {

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    const body = await req.json()

    const { 
        title,
        desc,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
       } = body;

       Object.keys(body).forEach((value: any) => {
        if(!body[value]){
            NextResponse.error()
        }
       })

       const listing = await prisma.listing.create({
        data: {
            title,
            desc,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
       })

       return NextResponse.json(listing)

    }