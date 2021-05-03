import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    createHttpLink
} from '@apollo/client'

export function makeApolloClient({ token }: any): ApolloClient<NormalizedCacheObject> {
    const link = createHttpLink({
        uri: `http://localhost:400/graphiql`,
    });
    const cache = new InMemoryCache()
    const client = new ApolloClient({
        link: link as any,
        cache
    });
    return client;
}

export default makeApolloClient;