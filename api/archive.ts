const BACKEND_API = process.env.NEXT_PUBLIC_API;

export async function getNumDays(): Promise<number> {
    try {
        const res = await fetch(`${BACKEND_API}/puzzle/numPuzzles`, {
            next: { revalidate: 86400 },
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
        console.error("getNumDays error:", err);

        throw err;
    }
}