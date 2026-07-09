import Link from "next/link"
import styles from "./Navbar.module.css"
import MobileNavbar from "./MobileNavbar"
import ProfileButton from "../ProfileButton/ProfileButton"
import { AuthProvider } from "@/contexts/AuthProvider"

export default async function Navbar () {
    
    return (
        <div>
            <div className={styles.navContainer}>
                <Link href={"/today"} className="w-full bg-background z-11 pl-8">
                    BookGuesser
                </Link>
                <div className="text-2xl flex-row items-center pr-20 hidden md:flex">
                    <Link className={styles.navLink} href={"/today"}>Today</Link>
                    <Link className={styles.navLink} href={"/archive"}>Archive</Link>
                    <ProfileButton></ProfileButton>
                </div>
                <MobileNavbar/>
            </div>
            
        </div>
    )
}