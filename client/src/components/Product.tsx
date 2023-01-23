import style from "../styles/product.module.scss"
import { Plant } from '../types/types'

type ProductProps = Omit<Plant, "_id">

export function Product(props:ProductProps) {
  return (
    <div className={style.product}>product</div>
  )
}

