const express = require("express")
const app = express()
require("dotenv").config()

const database = require("./database")

app.use(express.json())

app.get("/plants", async (req, res) => {
    const json = await database.load("plants")
    res.json(json)
    res.end()
})

app.post("/plant", async (req, res) => {
    const json = req.body
    const addedDocument = await database.create("plants", json)
    res.json(addedDocument)
    res.end()
})

app.listen(3000, () => console.log("server is running"))
