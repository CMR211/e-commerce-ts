const { MongoClient } = require("mongodb")
require("dotenv").config()

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true })

async function load(collectionName) {
    try {
        await client.connect()
        const collection = client.db("plants-e-commerce-ts").collection(collectionName)
        const documents = await collection.find({}).toArray()
        client.close()
        return documents
    } catch (error) {
        return error
    }
}

async function create(collectionName, document) {
    try {
        await client.connect()
        const collection = client.db("plants-e-commerce-ts").collection(collectionName)
        const addedDocument = await collection.insertOne(document)
        client.close()
        return addedDocument
    } catch (error) {
        return error
    }
}

module.exports = { load, create }
