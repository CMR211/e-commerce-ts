import styles from "../styles/navItem.module.scss"

type NavItemProps = {
    goto: string
}

export  function NavItem({ goto }: NavItemProps) {
    const properties = {
        destination: goto.slice(0, 1).toUpperCase() + goto.slice(1),
    }

    return <a className={styles.a}>{properties.destination}</a>
}
