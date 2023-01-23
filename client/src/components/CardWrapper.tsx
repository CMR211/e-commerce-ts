import { fetchPlant } from "../utils/useApiPlant"
import { useQuery } from "@tanstack/react-query"

import { QueryMessage } from "./QueryMessage"
import { CardLayout } from "./CardLayout"

type CardWithFetchProps = {
    id: string
}

function handleClick() {}

export function CardWrapper({ id }: CardWithFetchProps) {
    const { status, data, error } = useQuery(["plant" + id], () => fetchPlant(id))

    if (status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    if (status === "error") return <QueryMessage icon="error" message="Error loading data" />

    return (
        <CardLayout
            onClick={handleClick}
            family={data.family}
            images={data.images}
            name={data.name}
            price={data.price}
            old_price={data.old_price}
        />
    )
}
