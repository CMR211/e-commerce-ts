import styles from "../styles/homeCategory.module.scss"
import {Button} from "./Button"

type PropsType = {
    name: string
}

export  function HomeCategory({ name }: PropsType) {
    const image = `/assets/family_${name.toLowerCase()}.webp`
    return (
        <div className={styles.container}>
            <div className={styles.image_container} style={{ backgroundImage: `url(${image})` }}></div>
            <div className={styles.title}>
                <p>{name.toUpperCase()}</p>
            </div>
            <Button text="View category" />
        </div>
    )
}
