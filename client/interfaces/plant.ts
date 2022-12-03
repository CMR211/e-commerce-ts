export interface Plant {
    // _id: ObjectId
    _id: string
    name: string
    old_price?: number
    price: number
    desc: string
    family: string
    imgs: string[]
}
