import { getPastPuzzle } from "@/api/todayPuzzle";
import BookPage from "@/components/BookPage/BookPage";

export default async function Puzzle({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const book = await getPastPuzzle(id);

    return <BookPage book={book} />;
}