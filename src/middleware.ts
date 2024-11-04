import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    // console.log(request.cookies.get("access_token"))
    const token = request.cookies.get("access_token")?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl)) 
    }
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/profile/:path*',
    '/signup',
    '/verifyemail'
  ],
}