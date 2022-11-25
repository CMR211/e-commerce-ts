const { MongoClient } = require("mongodb")
const { hashPassword } = require("./utilities")
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

/**
 * 
 * @param {string} email 
 * @returns {string}
 */
async function loadUserCredentials(email) {
    try {
        await client.connect()
        const collection = client.db("plants-e-commerce-ts").collection("users")
        const document = await collection.findOne({email: email.toLowerCase()})
        console.log(document)   
        client.close()
        const userCredentials = {
            hash: document.password.match(/\{hash:[a-z0-9]+?\}/)[0].slice(6,-1),
            salt: document.password.match(/\{salt:[a-z0-9]+?\}/)[0].slice(6,-1)
        }
        return userCredentials
    } catch (error) {
        return error
    }
}

async function createUser(name, surname, email, password) {
    const userInfo = {
        name,
        surname,
        email,
        password: hashPassword(password)
    }
    try {
        await client.connect()
        const collection = client.db("plants-e-commerce-ts").collection("users")
        const addedUser = await collection.insertOne(userInfo)
        client.close()
        return addedUser
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

module.exports = { load, create, loadUserCredentials, createUser }
