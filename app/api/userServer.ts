"use server"

import { cookies } from "next/headers";

const BACKEND_API = process.env.NEXT_PUBLIC_API;

export async function getUser() {

    try {

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value

        const res = await fetch(`${BACKEND_API}/auth/user`, {
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        })

        if (!res.ok) {
            let message = `Request failed: ${res.status}`;

            try {
                const errorBody = await res.json();
                message = errorBody.error || message;
            } catch {}

            throw new Error(message);
        }

        return await res.json();

    } catch (err) {
        console.error("getUser error:", err);

        throw err;
    }
}

export async function validateToken() {
    try {

        const cookieStore = await cookies()

        const res = await fetch(`${BACKEND_API}/auth/user/refresh`, {
            headers : {
                Cookie : cookieStore.toString()
            }
        });

        if (!res.ok) {
            return false
        }

        const data = await res.json();

        return data 


    } catch (err) {
        console.error("validateToken error:", err);

        throw err;
    }
}