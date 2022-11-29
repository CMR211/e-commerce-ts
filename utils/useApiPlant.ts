import useSWR from "swr"
import axios from "axios"

const DEV_PREFIX = "http://localhost:3001"

async function axiosFetch(url: string) {
    return axios(url).then((res) => res.data)
}

export function usePlants() {
    console.log("### Fetching plants")
    const { data, error } = useSWR(DEV_PREFIX + "/plants", axiosFetch)
    return { data, error }
}

export function usePlant(plantID: string) {
    console.log("### Fetching plant with id=" + plantID)
    const { data, error } = useSWR(DEV_PREFIX + "/plant/" + plantID, axiosFetch)
    return { data, error }
}

export function useDiscountedPlants() {
    const {data, error} = useSWR(DEV_PREFIX + "/discounted", axiosFetch)
    console.log(data)
    return {data,error}
}
