import { LoginData, SignUpData } from "@/types/user";

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

        if (res.status == 403) {
            return false
        }

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
        console.error("login error:", err);

        throw err;
    }
}

export async function logout() {

    try {

        const res = await fetch(`${BACKEND_API}/auth/user/logOut`, {
            credentials : 'include',
            method: 'POST'
        })

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
        console.error("logout error:", err);

        throw err;
    }
}