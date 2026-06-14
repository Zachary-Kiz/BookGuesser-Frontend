
"use server"

import { PlayerGuess } from "@/types/user";
import { cookies } from "next/headers";

const BACKEND_API = process.env.NEXT_PUBLIC_API;

export async function uploadGuess(puzzleId : string, username : string, guessed : boolean, guesses : string[]) : Promise<string | undefined> {
    
    try {

        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value

        const body = {
            "puzzleId" : +puzzleId,
            "username" : username,
            "guessed" : guessed,
            "guesses" : guesses
        }

        const res = await fetch(`${BACKEND_API}/guess/upload`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            method: 'POST',
            body : JSON.stringify(body),
        });

        // if (!res.ok) {
        //     return undefined;
        // }

        return await res.json();
    } catch (err) {
        console.error("uploadGuess error:", err);

        throw err;
    }
}

export async function getGuess( username : string, puzzleId : string) : Promise<PlayerGuess | undefined> {
    
    try {

        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value

        const params = new URLSearchParams();

        params.append("username" , username)
        params.append("puzzleId", puzzleId)

        const res = await fetch(`${BACKEND_API}/guess/prev?${params}`, {
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            },
        });

        if (!res.ok) {
            return undefined;
        }

        return await res.json();
    } catch (err) {
        console.error("getGuess error:", err);

        throw err;
    }
}