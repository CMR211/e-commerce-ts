import { Application, NextFunction, Request, Response } from "express"

const express = require("express")
require("dotenv").config()

const { hashPassword } = require("./utilities")
const database = require("./database")
const { emailRegExp } = require("./regexp")

const PORT = process.env.PORT || 3001

const app: Application = express()
app.use(express.json())
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log(`A new request of ${req.path} from IP: ${req.ip}`)
    next()
})

app.get("/discounted", async (req: Request, res: Response) => {
    try {
        const json = await database.loadDiscountedPlants()
        res.json(json)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

app.get("/plants", async (req: Request, res: Response) => {
    try {
        const json = await database.loadPlants()
        res.json(json)
    } catch (error) {
        res.send(error)
    }
})

app.get("/plant/:id", async (req: Request<{ id: string }>, res: Response) => {
    const id = req.query.id
    try {
        const json = await database.loadPlant(id)
        res.json(json)
    } catch (error) {
        res.send(error)
    }
})

app.post("/plant", async (req: Request, res: Response) => {
    try {
        const documentToAdd = req.body
        const addedDocument = await database.createPlant(documentToAdd)
        res.json(addedDocument)
        res.end()
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

app.post("/createuser", async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password } = req.body
        const addedUser = await database.createUser(name, surname, email, password)
        res.sendStatus(200)
    } catch (error: any) {
        res.sendStatus(500).send(error.code)
    }
})

app.post("/login", async (req: Request, res: Response) => {
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
    } catch (error: any) {
        if (error.code === "ERR_INVALID_ARG_TYPE") res.sendStatus(500).send(error.code)
    }
})

app.delete("/deleteuser", async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const deletedUser = await database.deleteUser(email)
        res.sendStatus(200)
    } catch (error: any) {
        res.sendStatus(400).send(error.code)
    }
})

app.listen(PORT, () => console.log(`#### Server is running on port ${PORT} ####`))
