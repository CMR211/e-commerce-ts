import { fetchPlant } from "../utils/useApiPlant"
import { useQuery } from "@tanstack/react-query"

import QueryMessage from "./queryMessage"
import Card from "./card"

type CardWithFetchProps = {
    id: string
}

export default function CardWithFetch({ id }: CardWithFetchProps) {
    const { status, data, error } = useQuery(["plant" + id], () => fetchPlant(id))

    if (status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    if (status === "error") return <QueryMessage icon="error" message="Error loading data" />

    return (
        <Card
            desc={data.desc}
            family={data.family}
            images={data.images}
            name={data.name}
            price={data.price}
            old_price={data.old_price}
        />
    )
}
