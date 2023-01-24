export function createSlug(plantName:string) {
    return plantName.replace(/\s/g, "-").toLowerCase().replace(/'/g, "")
}
