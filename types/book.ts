export interface Cover {
    imageUrl: string;
    level: number;
    book_id: number;
}

export interface Book {
    title: string;
    author: string;
    releaseYear: number;
    genre: string;
    covers: Array<Cover>;
}

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface HintLevelInterface {
    [key: string] : number
}

export const HintLevels : HintLevelInterface = {
    "Genre" : 1,
    "Year" : 3,
    "Author" : 4
}