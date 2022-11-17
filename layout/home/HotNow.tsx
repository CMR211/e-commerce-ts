import React from "react"
import styles from "./HotNow.module.scss"
import Card from "../components/Card"

export default function HotNow() {
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Featured special offers</h2>
                <div className={styles.bg}></div>
                <div className={styles.container}>
                    <Card id="001" showOldPrice={true} />
                    <Card id="002" showOldPrice={true} />
                    <Card id="003" showOldPrice={true} />
                    <Card id="004" showOldPrice={true} />
                </div>
            </div>
        </section>
    )
}
