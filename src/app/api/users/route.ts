import connectToDb from '../../../../libs/mongodb'
import User from '../../../../models/userModel'
import {NextResponse} from 'next/server'
import { NextApiRequest } from 'next'

type UserReqBody = {
    name: string
    gender: string
    email: string
    password: string
}

export async function POST(req: NextApiRequest) {
    //@ts-ignore
    const {name, gender, email, password} = await req.json()

    await connectToDb()
    await User.create({name, gender, email, password})
    return NextResponse.json({message: 'User created successfully'}, {status: 201})
}

export async function GET() {
    await connectToDb()
    const users = await User.find()
    return NextResponse.json(users, {status: 200})
}

export async function DELETE(req: NextApiRequest) {
    const id = req.query.id
    await connectToDb()
    await User.findByIdAndDelete(id)
    return NextResponse.json({message: 'User deleted successfully'}, {status: 200})
}