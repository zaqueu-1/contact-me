import connectToDb from '../../../../../libs/mongodb'
import Contact from '../../../../../models/contactModel'
import { NextApiRequest } from 'next'
import {NextResponse} from 'next/server'

export async function PUT(req: NextApiRequest, {params}: {params: { id: string }}) {
    const {id} = params
    const {newName: name, newEmail: email, newTel: tel} = await req.json()
    await connectToDb()
    await Contact.findByIdAndUpdate(id, {name, email, tel})
    return NextResponse.json({message: 'Contact updated successfully'}, {status: 200})
}

export async function DELETE(req: NextApiRequest, {params}: {params: { id: string }}) {
    const {id} = params
    await connectToDb()
    await Contact.findByIdAndDelete(id)
    return NextResponse.json({message: 'Contact deleted successfully'}, {status: 200})
}