import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export const POST = async (req: Request) => {

    const {name, email, password} = await req.json()

    const hashPassword = await bcrypt.hash(password, 12)

    const user =await prisma.user.create({
        data: {
            email,
            name,
            password: hashPassword
        }
    })

    return NextResponse.json(user)
}