
import * as actionTypes from "../constants/ActionTypes";

export default function calculateReduce(state = 0, action){
    switch (action.type) {
        case actionTypes.CAL_ADD:
            return Number.parseInt(state) + Number.parseInt(action.payload.value);
            break;
        case actionTypes.CAL_MINUS:
            return Number.parseInt(state) - Number.parseInt(action.payload.value);
            break;
        default:
            return state;
    }
}
