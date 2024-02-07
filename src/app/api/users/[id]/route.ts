import connectToDb from '../../../../../libs/mongodb'
import User from '../../../../../models/userModel'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest, {params}: {params: { id: string }}) {
    const {id} = params
    const existingUser =  await User.findById(id)

    try {
        await connectToDb()
        return NextResponse.json(existingUser, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}

export async function PUT(req: NextRequest, {params}: {params: { id: string }}) {
    const {id} = params
    const {newName: name, newEmail: email, newPassword: password} = await req.json()

    try {
        await connectToDb()
        await User.findByIdAndUpdate(id, {name, email, password})
        return NextResponse.json({message: 'User updated successfully'}, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}

export async function DELETE(req: NextRequest, {params}: {params: { id: string }}) {
    const {id} = params
    
    try {
        await connectToDb()
        await User.findByIdAndDelete(id)
        return NextResponse.json({message: 'User deleted successfully'}, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}