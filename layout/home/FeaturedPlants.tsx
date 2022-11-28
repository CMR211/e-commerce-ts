import React from "react"
import styles from "./FeaturedPlants.module.scss"
import Card from "../components/Card"

export default function FeaturedPlants() {
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Featured special offers</h2>
                <div className={styles.bg}></div>
                <div className={styles.container}>
                    <Card id="63762ab9c0bc3e20323e48f3" showOldPrice={true} />
                    <Card id="002" showOldPrice={true} />
                    <Card id="003" showOldPrice={true} />
                    <Card id="004" showOldPrice={true} />
                </div>
            </div>
        </section>
    )
}
