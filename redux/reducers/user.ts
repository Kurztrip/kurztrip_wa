import {createStore, AnyAction, Store} from 'redux';

const initState = {
    name: "Pepito",
    email: "pepito@test.test"
}

export const userReducer = (state = initState, action: AnyAction) =>{

    switch (action.type) {
        case "PUT":
            return{
                ...state,
                ...action.payload,
            }
            break;
            case "ADD_PROPERTY":
            return{
                ...state,
                ...action.payload,
            }
        
        default:
            return state
            break;
    }

}
