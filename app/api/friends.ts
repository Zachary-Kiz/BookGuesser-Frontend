"use server"

import { cookies } from "next/headers";

const BACKEND_API = process.env.NEXT_PUBLIC_API;

export async function getUserList(user: string) {

    try {

        const params = new URLSearchParams()
        params.append("username", user)

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value

        const res = await fetch(`${BACKEND_API}/friends/getUsers?${params}`, {
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
        console.error("getUserList error:", err);

        throw err;
    }
}

export async function requestFriend(username: string) {
    try {
    
            const cookieStore = await cookies()
            const accessToken = cookieStore.get('accessToken')?.value
    
            const body = {
                "username" : username,

            }
    
            const res = await fetch(`${BACKEND_API}/friends/createReq`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${accessToken}`
                },
                method: 'POST',
                body : JSON.stringify(body),
            });
    
            if (!res.ok) {
                let message = `Request failed: ${res.status}`;

                try {
                    const errorBody = await res.json();
                    message = errorBody.error || message;
                } catch {}

                throw new Error(message);
            }
    
            return await res.text();
        } catch (err) {
            console.error("requestFriend error:", err);
    
            throw err;
        }
}

export async function getFriendReqs() {

    try {

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value

        const res = await fetch(`${BACKEND_API}/friends/getRequests`, {
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
        console.error("getFriendReqs error:", err);

        throw err;
    }
}

export async function getFriends() {

    try {

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value

        const res = await fetch(`${BACKEND_API}/friends`, {
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
        console.error("getFriendReqs error:", err);

        throw err;
    }
}

export async function deleteFriendReq(fromUser : string, toUser : string) {

    try {

        const body = {
            fromUser : fromUser,
            toUser : toUser
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value

        const res = await fetch(`${BACKEND_API}/friends/deleteReq`, {
            headers: {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body : JSON.stringify(body),
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
        console.error("deleteFriendReq error:", err);

        throw err;
    }
}

export async function acceptFriendReq(fromUser : string, toUser : string) {

    try {

        const body = {
            fromUser : fromUser,
            toUser : toUser
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value

        const res = await fetch(`${BACKEND_API}/friends/acceptReq`, {
            headers: {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body : JSON.stringify(body),
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
        console.error("deleteFriendReq error:", err);

        throw err;
    }
}