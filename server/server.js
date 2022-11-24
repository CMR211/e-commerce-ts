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

app.post("/login", async (req, res) => {
    try {
        const { inputEmail, inputPassword } = req.body
        if (inputPassword === "") {
            res.status(400).send("Password cannot be empty!")
        }
        if (inputEmail === "" || !emailRegExp.test(inputEmail)) {
            res.status(400).send("You must enter a valid email!")
        }
        const hashedInputPassword = hash256(inputPassword)
        const loginData = {
            date: new Date().toISOString(),
            email: inputEmail,
            hash: hashedInputPassword,
        }
        res.json(loginData)
    } catch (error) {
        if (error.code === "ERR_INVALID_ARG_TYPE") res.status(500).send(error.code)
    }
})

app.listen(PORT, () => console.log("server is running"))
