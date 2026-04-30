export async function getNumDays(): Promise<number> {
    try {
        const res = await fetch(`http://localhost:8080/puzzle/numPuzzles`, {
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
        console.error("getNumDays error:", err);

        throw err;
    }
}