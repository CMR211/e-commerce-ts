import Logo from "./logo"
import NavItem from "./navItem"
import NavButton from "./navButton"
import {Cart, Search} from "./icons"

import styles from "../styles/navbar.module.scss"

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
                    <NavButton ><Cart /></NavButton>
                    <NavButton ><Search /></NavButton>
                </div>
            </div>
        </div>
    )
}
