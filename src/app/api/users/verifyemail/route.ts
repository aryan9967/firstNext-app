import { connect } from "@/dbConfig/db";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json()
        const hashId = reqbody.token
        console.log(hashId)

        const user = await User.findOne({ verifyToken: hashId, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
        }
        console.log(user)
        user.isVerified = true
        user.verifyToken = null
        user.verifyTokenExpiry = null
        await user.save()
        console.log(user)
        return NextResponse.json({
            message: "User verified successfully",
            success: true
        })
        

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}