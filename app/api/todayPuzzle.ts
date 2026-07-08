import { Book } from "@/types/book";

const BACKEND_API = process.env.NEXT_PUBLIC_API;

interface TodayPuzzleType {
    puzzleId : number;
    book : Book;
}

export async function getTodayPuzzle(): Promise<TodayPuzzleType> {
    try {
        const res = await fetch(`${BACKEND_API}/puzzle/today`, {
            // next: { revalidate: 86400 }, // 24 hours
        });

        if (!res.ok) {
            let message = `Request failed: ${res.status}`;

            try {
                const errorBody = await res.text();
                message = errorBody || message;
            } catch {}

            throw new Error(message);
        }

        const resJson = await res.json();
        return await resJson;
    } catch (err) {
        console.error("getTodayPuzzle error:", err);

        throw err;
    }
}

export async function getPastPuzzle(id : string): Promise<Book> {
    try {
        const res = await fetch(`${BACKEND_API}/puzzle/${id}`);

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
        console.error("getPastPuzzle error:", err);

        throw err;
    }
}

export async function searchBooks(query: string): Promise<string[]> {
    try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10`);

        if (!res.ok) {
            let message = `Request failed: ${res.status}`;

        try {
            const errorBody = await res.text();
            message = errorBody || message;
        } catch {}

        throw new Error(message);
        }

        const resJson = await res.json();
        const resItems : string[] = resJson['docs']?.map((item: { title: any; }) => item?.title) || [];
        const removeDup : string[] = [...new Set(resItems)];

        return removeDup;
    } catch (err) {
        console.error("searching books error:", err);

        throw err;
    }
}