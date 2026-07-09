import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/contexts/AuthProvider";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookGuesser - Daily Book Puzzle Game",
  description:
      "Guess the book from clues in this daily puzzle game. Test your book knowledge with BookGuesser.",
  keywords: [
      "BookGuesser",
      "book guessing game",
      "daily puzzle",
      "books game",
  ],
  openGraph: {
      title: "BookGuesser - Daily Book Puzzle Game",
      description:
          "A daily puzzle game where you guess books from clues.",
      url: "https://bookguesser.app",
      siteName: "BookGuesser",
      type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let logged : boolean = false;
  const cookieStore = await cookies()
  const token = cookieStore.get('refreshToken')?.value;
  if (token) logged = true;
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider logged={logged}>
          <Navbar></Navbar>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
