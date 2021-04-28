import type { AppProps /*, AppContext */ } from 'next/app'
import {Provider} from "react-redux"
import withRedux, { createWrapper } from "next-redux-wrapper"
import createCache from '@emotion/cache';

import {store} from "../redux/store"
import Layout from "../comps/Layout";

export const cache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps }:AppProps) {
  return <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
}

const makeStore = () =>  store

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);