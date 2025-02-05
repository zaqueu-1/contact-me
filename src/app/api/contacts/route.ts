import { NextResponse } from "next/server"
import { connectToDB } from "@/libs/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { db } = await connectToDB()
    const contacts = await db
      .collection("contacts")
      .find({ createdBy: session.user.id })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(contacts)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error loading contacts" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }

    const { name, email, tel } = await request.json()

    if (!name || !tel) {
      return NextResponse.json(
        { message: "Name and telephone are mandatory" },
        { status: 400 },
      )
    }

    const { db } = await connectToDB()
    const result = await db.collection("contacts").insertOne({
      name,
      email,
      tel,
      createdBy: session.user.id,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { message: "Contact created succesfully", contactId: result.insertedId },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error creating contact" },
      { status: 500 },
    )
  }
}
