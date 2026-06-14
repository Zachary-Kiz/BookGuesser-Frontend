import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./app/api/userServer";

export async function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get("refreshToken")
    const accessToken = req.cookies.get("accessToken");

    const res = NextResponse.next()

    if (refreshToken && !accessToken) {
        const data = await validateToken()
        res.cookies.set("accessToken", data['accessToken'], {
            httpOnly: true,
            path: '/',
            maxAge : 60 * 15
        })
    }

    return res
}

export const config = {
    matcher : ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}