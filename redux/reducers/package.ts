import {createStore, AnyAction, Store} from 'redux';
import { Package } from '../types/Package';

const initState: Package[] = [{
    id: 1,
    address: "string 1",
    longitude: 1,
    latitude: 1,
    volume: 1,
    weight: 1,
    store_id: 1,
},
{
    id: 2,
    address: "address 2",
    longitude: 142342,
    latitude: 4353451,
    volume: 165682,
    weight: 115325,
    store_id: 1,
},
{
    id: 3,
    address: "address 3",
    longitude: 1423421413,
    latitude: 435344232451,
    volume: 165688999882,
    weight: 115325389111454,
    store_id: 2,
},
]

export const packageReducer = (state = initState, action: AnyAction) =>{

    switch (action.type) {
        case "getPackages":
            return state;
            break;
        default:
            return state
            break;
    }

}
