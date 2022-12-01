import axios from "axios"

const DEV_PREFIX = "http://localhost:3001"

export async function fetchPlant(plantID: string) {
    const response = await axios.get(DEV_PREFIX + "/plant/" + plantID)
    return response
}

export async function fetchDiscountedPlants() {
    const response = await axios.get(DEV_PREFIX + "/discounted")
    return response
}
