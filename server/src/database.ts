import { Document, MongoClient, OptionalId } from "mongodb"
// import { Plant } from "../interfaces/plant"
import { hashPassword } from "./utilities"
require("dotenv").config()

//@ts-ignore
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true })

const DATABASE = "plants-e-commerce-ts"
const COLLECTION_PLANTS = "plants"
const COLLECTION_USERS = "users"

async function loadPlants() {
    try {
        await client.connect()
        const plantsFromDB = await client.db(DATABASE).collection(COLLECTION_PLANTS).find({}).toArray()
        client.close()
        return plantsFromDB
    } catch (error) {
        return error
    }
}

async function loadPlant(id: string) {
    try {
        await client.connect()
        const plantFromDB = await client.db(DATABASE).collection(COLLECTION_PLANTS).findOne({ _id: id })
        client.close()
        return plantFromDB
    } catch (error) {
        return error
    }
}

/**
 * Queries the db to find plants at discounted price (price < old_price).
 * Returns an array of 4 or less plants randomly picked from all discounted plants
 */
async function loadDiscountedPlants() {
    try {
        await client.connect()
        const discountedPlants = await client
            .db(DATABASE)
            .collection(COLLECTION_PLANTS)
            .find({
                $expr: {
                    $lt: ["$price", "$old_price"],
                },
            })
            .toArray()
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
    } catch (error) {
        return error
    }
}

async function loadUserCredentials(email: string) {
    await client.connect()
    const userInfoFromDB = await client.db(DATABASE).collection(COLLECTION_USERS).findOne({ email: email.toLowerCase() })
    client.close()
    if (!userInfoFromDB) throw new Error("No matching user")
    const userCredentials = {
        hash: userInfoFromDB.password.match(/\{hash:[a-z0-9]+?\}/)[0].slice(6, -1),
        salt: userInfoFromDB.password.match(/\{salt:[a-z0-9]+?\}/)[0].slice(6, -1),
    }
    return userCredentials
}

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
        return addedUser
    } catch (error) {
        return error
    }
}

async function deleteUser(email: string) {
    try {
        await client.connect()
        const deletedUser = await client.db(DATABASE).collection(COLLECTION_USERS).deleteOne({ email: email })
        client.close()
        return deletedUser
    } catch (error) {
        return error
    }
}

async function createPlant(document: OptionalId<Document>) {
    try {
        await client.connect()
        const collection = client.db(DATABASE).collection(COLLECTION_PLANTS)
        const addedDocument = await collection.insertOne(document)
        client.close()
        return addedDocument
    } catch (error) {
        return error
    }
}

const database = { loadPlants, loadPlant, loadDiscountedPlants, createPlant, loadUserCredentials, createUser, deleteUser }
export default database
