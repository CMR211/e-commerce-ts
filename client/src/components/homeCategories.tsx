import styles from "../styles/homeCategories.module.scss"
import Category from "./homeCategory"
import categories from "../json/categories.json"
import { Text } from "./text"

export default function Categories() {
    return (
        <div className={styles.container}>
            <Text variant="section" >Browse categories</Text>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <Category key={category} name={category} />
                ))}
            </div>
        </div>
    )
}
