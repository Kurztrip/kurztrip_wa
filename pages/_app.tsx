import type { AppProps /*, AppContext */ } from 'next/app'
import {Provider} from "react-redux"
import withRedux, { createWrapper } from "next-redux-wrapper"
import createCache from '@emotion/cache';
import { ApolloProvider } from "@apollo/client";
import client from "./apollo.config";
import {store} from "../redux/store"
import Layout from "../comps/Layout";

export const cache = createCache({ key: 'css', prepend: true });



function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ApolloProvider client={client}>
        <Provider store={store} >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </ApolloProvider>
  )
}

const makeStore = () =>  store

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);