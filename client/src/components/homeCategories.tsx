import styles from "../styles/homeCategories.module.scss"
import Category from "./homeCategory"
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
