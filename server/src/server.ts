import express, { Application, NextFunction, Request, Response } from "express"
import detenv from "dotenv"
detenv.config()

import { hashPassword } from "./utilities"
import database from "./database"
import { emailRegExp } from "./regexp"

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
        res.status(500).send(error)
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

app.get("/plant/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id
    console.log(id)
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
        res.status(500).send(error)
    }
})

app.post("/createuser", async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password } = req.body
        const result = await database.createUser(name, surname, email, password)
        if (result === "OK") res.status(200).send("User added.")
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

// TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
app.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (password === "") throw new Error("ERR_EMPTY_PASSWORD")
        if (email === "" || !emailRegExp.test(email)) throw new Error("ERR_INVALID_EMAIL")

        const userInDB = await database.loadUserCredentials(email)
        if (!userInDB) throw new Error("ERR_USER_NOT_FOUND")

        const match = userInDB.password.match(/\{salt:[a-z0-9]+?\}/)
        if (!match) throw new Error("ERR_COULDNT_FIND_PASSWORD")

        const salt = match[0].slice(6, -1)
        const loginUserHash = hashPassword(password, salt)
        if (!(userInDB.password === loginUserHash)) throw new Error("ERR_INCORRECT_PASSWORD")

        res.status(200).send("Succesfully logged in.")
    } catch (error: any) {
        if (error.message === "ERR_EMPTY_PASSWORD") res.status(400).send("Password can not be empty!")
        if (error.message === "ERR_INVALID_ARG_TYPE") res.status(400).send(error.message)
        if (error.message === "ERR_INVALID_EMAIL") res.status(400).send("You must enter a valid email!")
        if (error.message === "ERR_USER_NOT_FOUND") res.status(403).send("User nor found!")
        if (error.message === "ERR_INCORRECT_PASSWORD") res.status(400).send("Incorrect password!")
        if (error.message === "ERR_COULDNT_FIND_PASSWORD") res.status(500).send("Password cannot be retrieved")
        else res.status(500).send(error.message)
    }
})

app.delete("/deleteuser", async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const status = await database.deleteUser(email)
        if (!status.acknowledged) throw new Error("ERR_DB_NOT_RESPONDING")
        if (status.deletedCount < 1) throw new Error("ERR_USER_NOT_FOUND")
        else res.status(200).send("User deleted")
    } catch (error: any) {
        if (error.message === "ERR_DB_NOT_RESPONDING") res.status(400).send("Database is not responding")
        if (error.message === "ERR_USER_NOT_FOUND") res.status(403).send("User to be deleted not found")
    }
})

app.listen(PORT, () => console.log(`#### Server is running on port ${PORT} ####`))
