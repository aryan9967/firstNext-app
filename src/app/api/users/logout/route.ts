import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })
        response.cookies.set("access_token", "", { httpOnly: true, expires: new Date(0) })

        return response;
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}