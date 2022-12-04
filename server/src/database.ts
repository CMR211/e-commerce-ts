import { MongoClient, ObjectId } from "mongodb"
import path from "path"
import * as dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

import { hashPassword } from "./utilities"
import { Plant, User, UserCredentials } from "./interfaces"

const mongoURI: string = process.env.MONGO_URI!
const client: MongoClient = new MongoClient(mongoURI)

const DATABASE = "plants-e-commerce-ts"
const COLLECTION_PLANTS = "plants"
const COLLECTION_USERS = "users"

async function loadPlants(): Promise<Plant[]> {
    try {
        await client.connect()
        const plantsFromDB = (await client.db(DATABASE).collection(COLLECTION_PLANTS).find({}).toArray()) as Plant[]
        client.close()
        return plantsFromDB
    } catch (error: any) {
        return error
    }
}

async function loadPlant(id: string): Promise<Plant> {
    console.log(id)
    try {
        await client.connect()
        const plantFromDB = (await client
            .db(DATABASE)
            .collection(COLLECTION_PLANTS)
            .findOne({ _id: new ObjectId(id) })) as Plant
        client.close()
        return plantFromDB
    } catch (error: any) {
        return error
    }
}

/**
 * Queries the db to find plants at discounted price (price < old_price).
 * Returns an array of 4 or less plants randomly picked from all discounted plants
 */
async function loadDiscountedPlants(): Promise<Plant[]> {
    try {
        await client.connect()
        const discountedPlants = (await client
            .db(DATABASE)
            .collection(COLLECTION_PLANTS)
            .find({
                $expr: {
                    $lt: ["$price", "$old_price"],
                },
            })
            .toArray()) as Plant[]
        client.close()
        const randomIndexes: number[] = []
        while (true) {
            if (randomIndexes.length >= 4 || randomIndexes.length === discountedPlants.length) break
            const randomIndex = Math.floor(Math.random() * discountedPlants.length)
            if (randomIndexes.includes(randomIndex)) continue
            else randomIndexes.push(randomIndex)
        }
        const randomDiscountedPlants = discountedPlants.filter((plant, index) => randomIndexes.includes(index))
        return randomDiscountedPlants
    } catch (error: any) {
        return error
    }
}

// Err handling ok
async function loadUserCredentials(email: string): Promise<User> {
    await client.connect()
    const user = (await client.db(DATABASE).collection<User>(COLLECTION_USERS).findOne({ email: email.toLowerCase() })) as User
    client.close()
    return user
}

// Err handling ok
async function createUser(name: string, surname: string, email: string, password: string) {
    const newUserData = {
        name,
        surname,
        email,
        password: hashPassword(password),
    }
    try {
        await client.connect()
        const usersFromDB = client.db(DATABASE).collection(COLLECTION_USERS)
        const addedUser = await usersFromDB.insertOne(newUserData)
        client.close()
        return "OK"
    } catch (error) {
        return error
    }
}

// Err handling ok
async function deleteUser(email: string) {
    await client.connect()
    const status = await client.db(DATABASE).collection(COLLECTION_USERS).deleteOne({ email: email })
    client.close()
    return status
}

async function createPlant(document: Plant) {
    await client.connect()
    const collection = client.db(DATABASE).collection(COLLECTION_PLANTS)
    const addedDocument = await collection.insertOne(document)
    client.close()
    return addedDocument
}

const database = { loadPlants, loadPlant, loadDiscountedPlants, createPlant, loadUserCredentials, createUser, deleteUser }
export default database
