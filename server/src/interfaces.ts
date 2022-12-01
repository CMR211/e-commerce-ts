import { ObjectId } from "mongodb"

export interface Plant {
    _id: ObjectId
    name: string
    old_price?: number
    price: number
    desc: string
    family: string
    imgs: string[]
}

export interface UserCredentials {
    hash: string
    salt: string
}

export interface User {
    _id: ObjectId
    name: string
    surname: string
    email: string
    password: string
}
