import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.apps.3.93.103.212.nip.io/",
    cache: new InMemoryCache(),
});

export default client;