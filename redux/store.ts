import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import { userReducer} from './reducers/user'
// import tick from './tick/reducer'

export const store = createStore(userReducer)

