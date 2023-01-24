import { fetchPlant } from "../utils/useApiPlant"
import { useQuery } from "@tanstack/react-query"

import { QueryMessage } from "./QueryMessage"
import { CardLayout } from "./CardLayout"
import { handleClick } from "../utils/redirect"

type CardWithFetchProps = {
    id: string
}

export function CardWrapper({ id }: CardWithFetchProps) {
    const { status, data, error } = useQuery(["plant" + id], () => fetchPlant(id), {staleTime: Infinity})

    if (status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    if (status === "error") return <QueryMessage icon="error" message="Error loading data" />



    return (
        <CardLayout
            onClick={() => handleClick(id)}
            family={data.family}
            images={data.images}
            name={data.name}
            price={data.price}
            old_price={data.old_price}
        />
    )
}
