import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function verifytoken(request : NextRequest){
    try {
        const data = jwt.verify(request.cookies.get('access_token')?.value || "", process.env.TOKEN_SECRET!)
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
        return NextResponse.json({error : error.message}, {status:500})
    }
}