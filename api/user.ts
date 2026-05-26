"use server"

import { LoginData, SignUpData } from "@/types/user";
import { cookies } from "next/headers";

const BACKEND_API = process.env.NEXT_PUBLIC_API;

export async function registerAccount(username : string, email : string, password : string): Promise<boolean> {
    try {

        const body : SignUpData = {
            "username" : username,
            "email" : email,
            "password" : password,
            "roles" : "ROLE_USER"
        }

        const res = await fetch(`${BACKEND_API}/auth/register`, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(body)
        });

        if (!res.ok) {
            let message = `Request failed: ${res.status}`;

            try {
                const errorBody = await res.json();
                message = errorBody.error || message;
            } catch {}

            throw new Error(message);
        }

        return true;
    } catch (err) {
        console.error("registerAccount error:", err);

        throw err;
    }
}

export async function login(username: string, password : string) {
    try {

        const body : LoginData = {
            "username" : username,
            "password" : password,
        }

        const res = await fetch(`${BACKEND_API}/auth/login`, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(body),
            credentials: 'include'
        });

        console.log(res.headers.getSetCookie());

        if (!res.ok) {
            let message = `Request failed: ${res.status}`;

        try {
            const errorBody = await res.text();
            message = errorBody || message;
        } catch {}

        throw new Error(message);
        }

        return true;
    } catch (err) {
        console.error("registerAccount error:", err);

        throw err;
    }
}

export async function validateToken() {
    try {

        const cookieStore = await cookies()

        const res = await fetch(`${BACKEND_API}/auth/user/refresh`, {
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

            throw new Error(message);
        }

        return await res.json();
    } catch (err) {
        console.error("registerAccount error:", err);

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

            throw new Error(message);
        }

        return await res.json();
    } catch (err) {
        console.error("getUser error:", err);

        throw err;
    }
}