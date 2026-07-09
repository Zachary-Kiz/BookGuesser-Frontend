import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ];
}