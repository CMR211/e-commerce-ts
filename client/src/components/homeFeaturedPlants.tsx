import styles from "../styles/homeFeaturedPlants.module.scss"
import Card from "./card"
import { fetchDiscountedPlants } from "../utils/useApiPlant"
import { useQuery } from "@tanstack/react-query"
import QueryMessage from "./queryMessage"

import { Plant } from "../types/types"
import { Text } from "./text"

export default function FeaturedPlants() {
    const { data, status, error } = useQuery(["discountedPlants"], fetchDiscountedPlants)

    // if (status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    // if (status === "error") return <QueryMessage icon="error" message="Error loading data" />

    const loaderPlant: Omit<Plant, "_id" | "desc"> = {
        family: "",
        name: "blank",
        images: [""],
        price: 0,
    }

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <Text variant="section">Featured special offers</Text>
                <div className={styles.bg}></div>

                <div className={styles.container}>
                    {status === "success"
                        ? data.map((plant: Plant) => (
                              <Card
                                  key={plant._id}
                                  family={plant.family}
                                  images={plant.images}
                                  name={plant.name}
                                  price={plant.price}
                                  old_price={plant.old_price}
                              />
                          ))
                        : new Array(4).fill(
                              <Card
                                  family={loaderPlant.family}
                                  images={loaderPlant.images}
                                  name={loaderPlant.name}
                                  price={loaderPlant.price}
                              />
                          )}
                </div>
            </div>
        </section>
    )
}
