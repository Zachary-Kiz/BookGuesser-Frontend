"use server"

import { cookies } from "next/headers";

const BACKEND_API = process.env.NEXT_PUBLIC_API;

export async function validateToken() {
    try {

        const cookieStore = await cookies()

        const res = await fetch(`${BACKEND_API}/auth/user/refresh`, {
            headers: {
                'Cookie': cookieStore.toString(),
            },
        });

        if (!res.ok) {
            return undefined;
        }

        return await res.json();
    } catch (err) {
        console.error("validateToken error:", err);

        throw err;
    }
}

export async function getUser() {
    try {

        const cookieStore = await cookies()

        const res = await fetch(`${BACKEND_API}/auth/user`, {
            headers: {
                'Cookie': cookieStore.toString(),
            },
        });

        if (!res.ok) {
            let message = `Request failed: ${res.status}`;

            try {
                const errorBody = await res.text();
                message = errorBody || message;
            } catch {}

            return undefined;
        }

        return await res.json();
    } catch (err) {
        console.error("getUser error:", err);

        throw err;
    }
}