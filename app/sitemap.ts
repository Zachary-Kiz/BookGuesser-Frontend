import { MetadataRoute } from "next";
import { getNumDays } from "./api/archive";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const puzzles = await getNumDays();
    const puzzleList = [];
    for (let i = 1; i <= puzzles; i++) {
        puzzleList.push({
            url: `https://bookguesser.app/puzzle/${i}`,
            lastModified: new Date()
        })
    }
    return [
        {
            url: "https://bookguesser.app",
            lastModified: new Date(),
        },
        {
            url: "https://bookguesser.app/today",
            lastModified: new Date(),
        },
        {
            url: "https://bookguesser.app/archive",
            lastModified: new Date(),
        },
        {
            url: "https://bookguesser.app/login",
            lastModified: new Date(),
        },
        {
            url: "https://bookguesser.app/sign_up",
            lastModified: new Date(),
        },
        {
            url: "https://bookguesser.app/profile",
            lastModified: new Date(),
        },
        {
            url: "https://bookguesser.app/puzzle",
            lastModified: new Date(),
        },
        {
            url: "https://bookguesser.app/logout",
            lastModified: new Date(),
        },
        ...puzzleList
    ];
}