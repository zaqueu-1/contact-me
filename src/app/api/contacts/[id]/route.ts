import { NextResponse } from "next/server"
import { connectToDB } from "@/libs/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/auth.config"
import { ObjectId } from "mongodb"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { newName, newEmail, newTel } = await request.json()
    if (!newName || !newTel) {
      return NextResponse.json(
        { message: "Name and telephone are mandatory" },
        { status: 400 },
      )
    }

    const { db } = await connectToDB()
    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(params.id),
      createdBy: session.user.id,
    })

    if (!contact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 },
      )
    }

    await db.collection("contacts").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name: newName,
          email: newEmail,
          tel: newTel,
        },
      },
    )

    return NextResponse.json(
      { message: "Contact updated succesfully" },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error updating contact" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { db } = await connectToDB()
    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(params.id),
      createdBy: session.user.id,
    })

    if (!contact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 },
      )
    }

    await db.collection("contacts").deleteOne({
      _id: new ObjectId(params.id),
    })

    return NextResponse.json(
      { message: "Contact deleted succesfully" },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error deleting contact" },
      { status: 500 },
    )
  }
}
