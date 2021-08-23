import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    createHttpLink
} from '@apollo/client'

export function makeApolloClient({ token }: any): ApolloClient<NormalizedCacheObject> {
    const link = createHttpLink({
        uri: `https://api.apps.3.93.103.212.nip.io`,
    });
    const cache = new InMemoryCache()
    const client = new ApolloClient({
        link: link as any,
        cache
    });
    return client;
}

export default makeApolloClient;