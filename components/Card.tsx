import React from "react"
import styles from "../../styles/components/Card.module.scss"

type CardProps = {
    name: string
    category: string
    price: number
    oldPrice?: number
    img: string
}

export default function Card({ name, category, price, oldPrice = -1, img }: CardProps) {
    return <div className={styles.card}>Card</div>
}
