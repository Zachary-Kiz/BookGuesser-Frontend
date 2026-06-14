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
  title: "BookGuesser",
  description: "Try to name the book in 6 guesses or less!",
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
