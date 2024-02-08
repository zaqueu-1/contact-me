import connectToDb from '../../../../../libs/mongodb'
import Contact from '../../../../../models/contactModel'
import {NextRequest, NextResponse} from 'next/server'

export async function PUT(req: NextRequest, {params}: {params: { id: string }}) {
    const {id} = params
    
    try {
        await connectToDb()
        const {newName: name, newEmail: email, newTel: tel} = await req.json()
        await Contact.findByIdAndUpdate(id, {name, email, tel})
        return NextResponse.json({message: 'Contact updated successfully'}, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}

export async function DELETE(req: NextRequest, {params}: {params: { id: string }}) {
    const {id} = params
    
    try {
        await connectToDb()
        await Contact.findByIdAndDelete(id)
        return NextResponse.json({message: 'Contact deleted successfully'}, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}