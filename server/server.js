const express = require("express")
const app = express()
require("dotenv").config()

const database = require("./database")

app.get("/plants", async (req, res) => {
    const json = await database.load("plants")
    console.log(json)
    res.json(json)
    res.end()
})

app.post("/plant", async (req,res) => {
	const data = req.body
	console.log(data)
	res.end()
	// const addedDocument = await database.create("plants", )
})

app.listen(3000, () => console.log("server is running"))
