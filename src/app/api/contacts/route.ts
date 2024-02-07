import connectToDb from '../../../../libs/mongodb'
import Contact from '../../../../models/contactModel'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
    const {name, email, tel, createdBy} = await req.json()

    try {
        await connectToDb()
        await Contact.create({name, email, tel, createdBy})
        return NextResponse.json({message: 'Contact created successfully'}, {status: 201})
    } catch {
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}

export async function GET() {
    const contacts = await Contact.find()
    
    try {
        await connectToDb()
        return NextResponse.json(contacts, {status: 200})
    } catch {
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}