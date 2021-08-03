import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://54.242.133.42/",
    cache: new InMemoryCache(),
});

export default client;