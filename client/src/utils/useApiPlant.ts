import { Plant } from "../types/types"

const DEV_PREFIX = "http://localhost:3001"

export async function fetchPlant(plantID: string): Promise<Plant> {
    const response = await fetch(DEV_PREFIX + "/plant/" + plantID)
    const json = await response.json()
    return json
}

export async function fetchDiscountedPlants(): Promise<Plant[]> {
    const response = await fetch(DEV_PREFIX + "/discounted")
    const json = await response.json()
    return json
}
