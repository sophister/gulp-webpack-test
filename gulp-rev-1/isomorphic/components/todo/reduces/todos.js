
import {ALL} from "../constants/TodoFilters";
import * as actionTypes from "../constants/ActionTypes";

export function todoReduce(state = [], action){
    switch(action.type){
        case actionTypes.ADD_TODO:
            return [...state, {
                text : action.payload.text,
                complete : false
            }];
            break;
        case actionTypes.COMPLETE_TODO:
            return [
                ...state.slice(0, action.payload.index),
                //Object中的扩展运算符 ： http://es6.ruanyifeng.com/#docs/object
                Object.assign({}, state[action.payload.index], {complete:true}),
                ...state.slice(action.payload.index+1)
            ];
            break;
        case actionTypes.REQUEST_TODOS:
            return state;
            break;
        case actionTypes.RECEIVE_TODOS:
            return action.payload.todos;
            break;
        default:
            return state;
    }
}

export function todoFilterReduce(state = ALL, action){
    switch(action.type){
        case actionTypes.SWITCH_FILTER:
            return action.payload.filter;
            break;
        default:
            return state;
    }
}
