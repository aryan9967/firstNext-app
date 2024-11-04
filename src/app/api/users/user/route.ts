import { connect } from "@/dbConfig/db";
import { verifytoken } from "@/helpers/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";

connect()

export async function GET(request: NextRequest) {
    try {
        const userData = verifytoken(request)
        const id = userData.id
        const user = await User.findOne({ _id: id }).select("-password")
        // return NextResponse.json({
        //     email: user.email,
        //     username: user.username,
        //     userid: user._id,
        //     isVeriied: user.isVerified,
        //     isAdmin: user.isAdmin
        // })
        return NextResponse.json({message: "user found", data:user, success : true})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}