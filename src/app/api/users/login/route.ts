import { connect } from "@/dbConfig/db"
import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json()
        const{username, password} = reqbody
        console.log(username, password)

        const user = await User.findOne({username})

        if(!user){
            return NextResponse.json({error : "user not found"}, {status:400})
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "invalid password"}, {status:400})
        }

        const tokenData = {
            id: user._id,
            username: user.username
        }

        const access_token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn : "24h"})
        console.log(access_token)

        const response =  NextResponse.json({message: "user logged in successfully", succes : true})
        response.cookies.set("access_token", access_token, {httpOnly: true})

        return response

    } catch (error ) {
        console.error(error)
        return NextResponse.json({ error: error.message, status: 500 })
    }
}