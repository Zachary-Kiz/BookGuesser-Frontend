"use client"
import { useState } from "react";
import BurgerIcon from "../BurgerIcon/BurgerIcon";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Navbar.module.css"
import { useAuth } from "@/contexts/AuthProvider";

export default function MobileNavbar() {

    const { isLoggedIn } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openMenu = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <>
            <div className="flex z-11 bg-background w-16 items-center md:hidden">
                <BurgerIcon onClick={() => openMenu()}/>
            </div>
            <div className={clsx(styles.mobileNav, {[styles.visibleNav] : isOpen})}>
                <Link className={styles.mobileNavLink} href="/today">
                    Today
                </Link>
                <Link className={styles.mobileNavLink} href="/archive">
                    Archive
                </Link>
                {isLoggedIn ? 
                    <>
                        <Link className={styles.mobileNavLink} href="/profile">
                            Profile
                        </Link>
                        <Link className={styles.mobileNavLink} href={"/logout"}>Log Out</Link>
                    </>
                    :
                    <>
                        <Link className={styles.mobileNavLink} href={"/login"}>Login</Link>
                        <Link className={styles.mobileNavLink} href={"/sign_up"}>Sign Up</Link>
                    </>
                }
            </div>

        </>
    )
}