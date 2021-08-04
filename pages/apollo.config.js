import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://52.3.236.128/",
    cache: new InMemoryCache(),
});

export default client;