import { useMemo } from "react"
import { ApolloClient, InMemoryCache, NormalizedCacheObject, from } from "@apollo/client"

import { errorLink, httpLink } from "./links"
import authLink from "./links/authLink"

let apolloClient: ApolloClient<NormalizedCacheObject>

/**
 * Create Apollo client.
 */
const createApolloClient = () =>
    new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })

export const initializeApollo = (initialState = null) => {
    const _apolloClient = apolloClient ?? createApolloClient()

    if (initialState) {
        _apolloClient.cache.restore(initialState!)
    }

    if (typeof window === "undefined") return _apolloClient

    apolloClient = apolloClient ?? _apolloClient

    return apolloClient
}

export const useApollo = (initialState: any) =>
    useMemo(() => initializeApollo(initialState), [initialState])
