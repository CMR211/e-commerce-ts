const express = require("express")
require("dotenv").config()

const { hashPassword } = require("./utilities")
const database = require("./database")
const { emailRegExp } = require("./regexp")

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.get("/plants", async (req, res) => {
    try {
        const json = await database.loadPlants()
        res.json(json)
    } catch (error) {
        res.send(error)
    }
})

app.post("/plant", async (req, res) => {
    try {
        const documentToAdd = req.body
        const addedDocument = await database.createPlant(documentToAdd)
        res.json(addedDocument)
        res.end()
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

app.post("/createuser", async (req, res) => {
    try {
        const { name, surname, email, password } = req.body
        const addedUser = await database.createUser(name, surname, email, password)
        res.send(200)
    } catch (error) {
        res.sendStatus(500).send(error.code)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (password === "") res.status(400).send("Password cannot be empty!")
        if (email === "" || !emailRegExp.test(email)) res.status(400).send("You must enter a valid email!")
        const dbUserCredentials = await database.loadUserCredentials(email)
        const loginUserHash = hashPassword(password, dbUserCredentials.salt)
        if (dbUserCredentials.hash === loginUserHash) {
            res.status(200).send("Password correct!")
        } else {
            res.status(403).send("Incorrect password!")
        }
    } catch (error) {
        if (error.code === "ERR_INVALID_ARG_TYPE") res.sendStatus(500).send(error.code)
    }
})

app.delete("/deleteuser", async (req, res) => {
    try {
        const { email } = req.body
        const deletedUser = await database.deleteUser(email)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400).send(error.code)
    }
})

app.listen(PORT, () => console.log("#### Server is running ####"))
