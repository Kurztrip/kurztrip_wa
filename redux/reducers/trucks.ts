import {createStore, AnyAction, Store} from 'redux';
import { Package } from '../types/Package';


const initState= []

export const truckReducer = (state = initState, action: AnyAction) =>{

    switch (action.type) {
        case "getTrucks":
            return [...action.payload];
            break;
        default:
            return state
            break;
    }

}
