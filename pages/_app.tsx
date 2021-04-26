import '../styles/globals.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import {Provider} from "react-redux"
import withRedux, { createWrapper } from "next-redux-wrapper"

import {store} from "../redux/store"

function MyApp({ Component, pageProps }:AppProps) {
  return <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
}

const makeStore = () =>  store

const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
