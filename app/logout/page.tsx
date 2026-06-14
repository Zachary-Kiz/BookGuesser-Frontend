"use client"

import { redirect } from "next/navigation"
import { logout } from "../api/userClient"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthProvider"
import styles from "./Logout.module.css"

export default function LogOut() {

    const {isLoggedIn, setIsLoggedIn} = useAuth()

    if (!isLoggedIn) redirect("/today")

    const logOut = async () => {
        try {
            const res = await logout()
            if (res) {
                setIsLoggedIn(false)
            }
        } catch (e) {
            console.error(e)
        }
        
    }

    return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
            <div className="shadow p-6 rounded-2xl flex flex-col items-center gap-8 max-w-11/12 sm:max-w-1/2">
                <h2 className="text-3xl text-bold font-(--font-merriweather) text-center"><b>Are you sure you want to log out?</b></h2>
                <div>We'll miss you :(</div>
                <div className="flex flex-row gap-4">
                    <Link className={styles.cancelButton} href={"/today"}>
                        <button className="cursor-pointer">Cancel</button>
                    </Link>
                    <button className={styles.logoutButton} onClick={() => logOut()}>Log Out</button>
                </div>
            </div>
        </div>
    )
}