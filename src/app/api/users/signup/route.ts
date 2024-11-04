import { connect } from "@/dbConfig/db"
import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendmail } from "@/helpers/mailer"

connect()

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json()
        const{username, email, password} = reqbody
        console.log(username, email, password)

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error :"User already exists" ,status: 400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        const SavedUser = await newUser.save()
        await sendmail(email, SavedUser._id)
        console.log(SavedUser)

        return NextResponse.json({status : 201, message : "User created successfully", user: SavedUser})

    } catch (error ) {
        console.error(error)
        return NextResponse.json({ error: error.message, status: 500 })
    }
}