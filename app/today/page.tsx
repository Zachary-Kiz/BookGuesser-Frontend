import { getTodayPuzzle } from "@/api/todayPuzzle";
import BookPage from "@/components/BookPage/BookPage";

export default async function Today() {
    const book = await getTodayPuzzle();

    return <BookPage book={book}/>
    
}