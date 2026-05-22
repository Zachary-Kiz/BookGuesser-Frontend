"use client"
import { useState } from "react";
import BurgerIcon from "../BurgerIcon/BurgerIcon";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Navbar.module.css"

export default function MobileNavbar() {

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
                <Link className={styles.mobileNavLink} href="/profile">
                    Profile
                </Link>
            </div>

        </>
    )
}