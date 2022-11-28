/* eslint-disable @next/next/no-img-element */
import React from "react"
import styles from "./Card.module.scss"

import Button from "./Button"

import { getPlantPrices } from "../../utils/prices"
import { usePlant } from "../../utils/useApiPlant"

type CardProps = {
    id: string
    showOldPrice?: boolean
}

export default function Card({ id, showOldPrice }: CardProps) {
    const {data, error} = usePlant(id)
    if (!data) return <p>Loading...</p>

    const prices = getPlantPrices(data.price, data.old_price)

    return (
        <div className={styles.card}>
            <Button text="View Product" />
            <div className={styles.image_container}>
                <img className={styles.image} src={data?.images[0]} alt={`${data?.name} alt`} />
            </div>
            <p className={styles.name}>{data?.name}</p>

            <p className={styles.price}>
                {showOldPrice ? <span className={styles.old_price}>{prices.oldPriceFormatted}</span> : null}
                <span className={styles.price_prefix}>{prices.newPricePrefix}</span>
                {prices.newPriceBody}
                <span className={styles.price_suffix}>{prices.newPriceSuffix}</span>
            </p>

            <p className={styles.family}>{data?.family}</p>
        </div>
    )
}
