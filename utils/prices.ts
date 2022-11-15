export function getPlantPrices(newPrice: number, oldPrice: number) {
    const newPriceFormatted = newPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })
    const oldPriceFormatted = oldPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })
    return {
        newPriceFormatted,
        oldPriceFormatted,
        newPricePrefix: newPriceFormatted.slice(0, 1),
        newPriceBody: newPriceFormatted.slice(1, -3),
        newPriceSuffix: newPriceFormatted.slice(-3),
    }
}
