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

export async function getPastPuzzle(id : string): Promise<Book> {
    try {
        const res = await fetch(`http://localhost:8080/puzzle/${id}`, {
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

 export const debounce = <T extends unknown[]>(
        callback: (...args: T) => void,
        delay: number,
        ) => {
            let timeoutTimer: ReturnType<typeof setTimeout>;
            
            return (...args: T) => {
                clearTimeout(timeoutTimer);
            
                timeoutTimer = setTimeout(() => {
                callback(...args);
                }, delay);
            };
        };