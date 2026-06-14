"use client"

import Link from "next/link"
import styles from "./ProfileButton.module.css"
import { useAuth } from "@/contexts/AuthProvider"


export default function ProfileButton() {

    const { isLoggedIn } = useAuth();

    return (
        <>
            {isLoggedIn ? 
                <>
                    <Link className={styles.navLink} href={"/profile"}>Profile</Link>
                    <Link className={styles.navLink} href={"/logout"}>Log Out</Link>
                </>
                :
                <>
                <Link className={styles.navLink} href={"/login"}>Login</Link>
                <Link className={styles.navLink} href={"/sign_up"}>Sign Up</Link>
                </>  
            }
        </>
    )
}