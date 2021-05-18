import {createStore, AnyAction, Store} from 'redux';

const initState= []

export const routeReducer = (state = initState, action: AnyAction) =>{

    switch (action.type) {
        case "getRoutes":
            return [...action.payload];
            break;
        default:
            return state
            break;
    }

}