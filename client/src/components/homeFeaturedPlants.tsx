import styles from "../styles/homeFeaturedPlants.module.scss"
import Card from "./card"
import { fetchDiscountedPlants } from "../utils/useApiPlant"
import { useQuery } from "@tanstack/react-query"
import QueryMessage from "./queryMessage"

import { Plant } from "../types/types"

export default function FeaturedPlants() {
    const query = useQuery(["discountedPlants"], fetchDiscountedPlants)
    if (query.status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    if (query.status === "error") return <QueryMessage icon="error" message="Error loading data" />

    const plants: Plant[] = query.data.data
    const discountedPlantsIds = plants.map((plant) => plant._id)

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Featured special offers</h2>
                <div className={styles.bg}></div>
                <div className={styles.container}>
                    {discountedPlantsIds.map((plantID) => (
                        <Card key={plantID} id={plantID} showOldPrice={true} />
                    ))}
                </div>
            </div>
        </section>
    )
}
