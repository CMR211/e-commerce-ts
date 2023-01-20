import React from "react"

import styles from "../styles/card.module.scss"
import { Plant } from "../types/types"
import Button from "./button"

import { getPlantPrices } from "../utils/prices"
import { Loader } from "./icons"

type CardProps = Omit<Plant, "_id" | "desc">

export default function card(props: CardProps) {
    const { family, images, name, price, old_price } = props
    const prices = getPlantPrices(price, old_price)
    if (name === "blank") return <Loader />
    return (
        <div className={styles.card}>
            <Button text="View Product" />
            <div className={styles.image_container}>
                <img className={styles.image} src={images[0]} alt={`${name} alt`} />
            </div>
            <p className={styles.name}>{name}</p>

            <p className={styles.price}>
                {old_price ? <span className={styles.old_price}>{prices?.oldPriceFormatted}</span> : null}
                <span className={styles.price_prefix}>{prices?.newPricePrefix}</span>
                {prices?.newPriceBody}
                <span className={styles.price_suffix}>{prices?.newPriceSuffix}</span>
            </p>

            <p className={styles.family}>{family}</p>
        </div>
    )
}
