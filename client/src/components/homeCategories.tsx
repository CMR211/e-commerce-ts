import styles from "../styles/homeCategories.module.scss"

import { HomeCategory } from "./HomeCategory"
import { Text } from "./Text"

import categories from "../json/categories.json"

export function HomeCategories() {
    return (
        <div className={styles.container}>
            <Text variant="section">Browse categories</Text>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <HomeCategory key={category} name={category} />
                ))}
            </div>
        </div>
    )
}
