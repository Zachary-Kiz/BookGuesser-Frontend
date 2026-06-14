import { Guess } from "@/types/user";
import { cookies } from "next/headers";

export function handleGuess(guessed: boolean) : Guess {
    if (guessed === false) {
        return Guess.Failed;
    } else {
        return Guess.Success;
    }
}

export async function isRefreshToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value
    return refreshToken
}