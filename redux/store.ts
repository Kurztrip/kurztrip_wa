import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { userReducer} from './reducers/user'
import { packageReducer} from './reducers/package'
import { truckReducer } from './reducers/trucks'
// import tick from './tick/reducer'

const reducers = combineReducers({
    packages: packageReducer,
    userReducer: userReducer,
    trucks: truckReducer
})

//export const store = createStore(userReducer)
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))
