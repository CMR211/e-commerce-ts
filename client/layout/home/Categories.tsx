import React from "react"
import styles from "./Categories.module.scss"
import Category from "../components/Category"
import categories from "../json/categories.json"

export default function Categories() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Browse categories</h2>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <Category key={category} name={category} />
                ))}
            </div>
        </div>
    )
}
