/* eslint-disable @next/next/no-img-element */
import React from "react"
import styles from "./Card.module.scss"

import plants from "../../server/json/plants.json"

import { getPlantPrices } from "../../utils/prices"
import Button from "./Button"

type CardProps = {
    id: string
    showOldPrice?: boolean
}

export default function Card({ id, showOldPrice }: CardProps) {
    const plant = plants.find((plant) => plant.id === id) ?? plants[0]
    const prices = getPlantPrices(plant.price, plant.old_price)

    return (
        <div className={styles.card}>
            <Button text="View Product" />
            <div className={styles.image_container}>
                <img className={styles.image} src={plant?.images[0]} alt={`${plant?.name} alt`} />
            </div>
            <p className={styles.name}>{plant?.name}</p>

            <p className={styles.price}>
                {showOldPrice ? <span className={styles.old_price}>{prices.oldPriceFormatted}</span> : null}
                <span className={styles.price_prefix}>{prices.newPricePrefix}</span>
                {prices.newPriceBody}
                <span className={styles.price_suffix}>{prices.newPriceSuffix}</span>
            </p>

            <p className={styles.family}>{plant?.family}</p>
        </div>
    )
}
