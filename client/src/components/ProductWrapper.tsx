import { useQuery } from "@tanstack/react-query"
import { fetchPlant } from "../utils/useApiPlant"

import {Product} from "./Product"
import {QueryMessage} from "./QueryMessage"

type ProductWrapperProps = {
    id: string
}

export  function ProductWrapper(props: ProductWrapperProps) {
    const { id } = props

    const { status, data, error } = useQuery(["plant" + id], () => fetchPlant(id))

    if (status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    if (status === "error") return <QueryMessage icon="error" message="Error loading data" />

    return (
        <Product
            name={data.name}
            desc={data.desc}
            family={data.family}
            images={data.images}
            price={data.price}
            old_price={data.old_price || undefined}
        />
    )
}
