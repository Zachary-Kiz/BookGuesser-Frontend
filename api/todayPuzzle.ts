import { Book } from "@/types/book";

const URL = process.env.NEXT_PUBLIC_URL;

export async function getTodayPuzzle(): Promise<Book> {
    try {
        const res = await fetch(`http://localhost:8080/puzzle/today`, {
        cache: "no-store",
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
        console.error("getTodayPuzzle error:", err);

        throw err;
    }
}