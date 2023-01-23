import { Logo } from "./Logo"
import { NavItem } from "./NavItem"
import { NavButton } from "./NavButton"
import { Cart, Search } from "./Icons"

import styles from "../styles/navbar.module.scss"
import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.first}>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <NavItem goto="shop" />
                    <NavItem goto="Featured" />
                    <NavItem goto="About Us" />
                    <NavItem goto="FAQ" />
                    <NavItem goto="Blog" />
                    <NavItem goto="Contact" />
                </div>
                <div className={styles.second}>
                    <NavButton>
                        <Cart />
                    </NavButton>
                    <NavButton>
                        <Search />
                    </NavButton>
                </div>
            </div>
        </div>
    )
}
