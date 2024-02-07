import connectToDb from '../../../../libs/mongodb'
import User from '../../../../models/userModel'
import {NextResponse, NextRequest} from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
    const { name, gender, email, password } = await req.json()

    try {
        await connectToDb()
        await User.create({name, gender, email, password})
        return NextResponse.json({message: 'User created successfully'}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}

export async function GET() {
    const users = await User.find()

    try {
        await connectToDb()
        return NextResponse.json(users, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}