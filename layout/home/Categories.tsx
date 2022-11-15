import React from "react"
import styles from "./Category.module.scss"
import Category from "../components/Category"

export default function Categories() {
    return (
        <div>
            <h2>Browse categories</h2>
            <Category name="Araceae" />
            <Category name="Apocynaceae" />
            <Category name="Euphorbiaceae" />
        </div>
    )
}
