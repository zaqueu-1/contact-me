import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDB } from "@/libs/mongodb"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 },
      )
    }

    const { db } = await connectToDB()

    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: "E-mail already in use" },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { message: "User created succesfuly", userId: result.insertedId },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 },
    )
  }
}
