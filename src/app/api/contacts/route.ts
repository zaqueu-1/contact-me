import connectToDb from '../../../../libs/mongodb'
import Contact from '../../../../models/contactModel'
import {NextResponse} from 'next/server'
import { NextApiRequest } from 'next'

export async function POST(req: NextApiRequest) {
    const {name, email, tel, createdBy} = await req.json()

    await connectToDb()
    await Contact.create({name, email, tel, createdBy})
    return NextResponse.json({message: 'Contact created successfully'}, {status: 201})
}

export async function GET() {
    await connectToDb()
    const contacts = await Contact.find()
    return NextResponse.json(contacts, {status: 200})
}