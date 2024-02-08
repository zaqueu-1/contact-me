import connectToDb from '../../../../libs/mongodb'
import Contact from '../../../../models/contactModel'
import {NextRequest, NextResponse} from 'next/server'

export async function GET() {
    try {
        await connectToDb()
        const contacts = await Contact.find()
        return NextResponse.json(contacts, {status: 200})
    } catch {
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDb()
        const {name, email, tel, createdBy} = await req.json()
        await Contact.create({name, email, tel, createdBy})
        return NextResponse.json({message: 'Contact created successfully'}, {status: 201})
    } catch {
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}