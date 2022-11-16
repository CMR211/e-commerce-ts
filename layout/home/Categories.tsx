import React from "react"
import styles from "./Categories.module.scss"
import Category from "../components/Category"

export default function Categories() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Browse categories</h2>
            <div className={styles.categories}>
                <Category name="Araceae" />
                <Category name="Apocynaceae" />
                <Category name="Euphorbiaceae" />
            </div>
        </div>
    )
}
