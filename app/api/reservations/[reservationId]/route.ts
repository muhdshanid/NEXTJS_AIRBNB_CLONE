import { getCurrentUser } from '@/libs/actions'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export const DELETE = async (req: Request, {params}: {params: {reservationId?: string}}) => {


    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {reservationId} = params

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error("Invalid id")
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {id: reservationId,
        OR: [
            {userId: currentUser.id},
            {listing: {userId: currentUser.id}}
        ]}
    })


    return NextResponse.json(reservation)
}