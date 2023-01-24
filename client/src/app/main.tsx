import { Home } from "../components/Home"
import { Navbar } from "../components/Navbar"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProductWrapper } from "../components/ProductWrapper"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "products/:id",
                element: <ProductWrapper />,
            },
        ],
    },
])

export default function Main() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
