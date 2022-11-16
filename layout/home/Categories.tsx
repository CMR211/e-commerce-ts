import React from "react"
import styles from "./Categories.module.scss"
import Category from "../components/Category"

export default function Categories() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Browse categories</h2>
            <div className={styles.categories}>
                <Category name="Araceae" plant_ids={["001", "002"]} />
                <Category name="Apocynaceae" plant_ids={["003", "004"]} />
                <Category name="Euphorbiaceae" plant_ids={["005", "006"]} />
            </div>
        </div>
    )
}
