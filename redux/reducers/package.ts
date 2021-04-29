import {createStore, AnyAction, Store} from 'redux';

const initState = [{
    id: 1,
    name: "package 1"
},
{
    id: 2,
    name: "package 2"
},
{
    id: 3,
    name: "package 3"
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
