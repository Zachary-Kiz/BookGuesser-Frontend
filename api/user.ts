import { LoginData, SignUpData } from "@/types/user";
import { json } from "stream/consumers";

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
                'Content-Type': 'application/json', // Tell the server you're sending JSON
            },
            body : JSON.stringify(body)
        });

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

        const res = await fetch(`${BACKEND_API}/auth/user/refresh`, {
            credentials : 'include'
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