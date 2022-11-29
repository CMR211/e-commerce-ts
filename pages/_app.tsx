import "./_app.scss"
import type { AppProps } from "next/app"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/query-core"

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp
