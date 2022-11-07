import React from "react"
import Logo from "./Logo"
import NavItem from "./NavItem"
import NavButton from "./NavButton"

import styles from "../../styles/components/Navbar.module.scss"

export default function Navbar() {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.first}>
                    <Logo />
                    <NavItem goto="shop" />
                    <NavItem goto="Featured" />
                    <NavItem goto="About Us" />
                    <NavItem goto="FAQ" />
                    <NavItem goto="Blog" />
                    <NavItem goto="Contact" />
                </div>
                <div className={styles.second}>
                    <NavButton icon="search" />
                    <NavButton icon="bag" />
                </div>
            </div>
        </div>
    )
}
