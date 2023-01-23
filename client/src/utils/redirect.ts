import { redirect } from "react-router-dom"

export function handleClick(id:string) {
    const url = "/product/" + id
    console.log("redirecting to", url)
    return redirect("/product/" + id)
}
