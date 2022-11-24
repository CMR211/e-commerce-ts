const express = require("express")
require("dotenv").config()

const { hash256 } = require("./utilities")
const database = require("./database")
const { emailRegExp } = require("./regexp")

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.get("/plants", async (req, res) => {
    try {
        const json = await database.load("plants")
        res.json(json)
    } catch (error) {
        res.send(error)
    }
})

app.post("/plant", async (req, res) => {
    const documentToAdd = req.body
    const addedDocument = await database.create("plants", documentToAdd)
    res.json(addedDocument)
    res.end()
})

app.post("/createuser", async (req,res) => {
    try {
        const {email, password} = req.body
        const addedUser = await database.createUser(email, password)
        res.send(200)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email,  password } = req.body
        if (password === "") res.status(400).send("Password cannot be empty!")
        if (email === "" || !emailRegExp.test(email)) res.status(400).send("You must enter a valid email!")
        const dbUserCredentials = await database.loadUserCredentials(email)
        const loginUserHash = hash256(password, dbUserCredentials.salt)
        if (dbUserCredentials.hash === loginUserHash) {
            res.status(200).send("Password correct!")
        } else {
            res.status(403).send("Incorrect password!")
        }
    } catch (error) {
        if (error.code === "ERR_INVALID_ARG_TYPE") res.status(500).send(error.code)
    }
})

app.listen(PORT, () => console.log("server is running"))
