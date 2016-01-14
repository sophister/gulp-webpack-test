/**
 * Action ： 官方推荐的Action写法  https://github.com/acdlite/flux-standard-action
 * 	一个action只能包含以下四个属性 ：
 * 		type(必须) : 通常使用const定义
 * 		payload : 有效的数据信息，如果error为true返回一个Error对象
 * 		error
 * 		meta
 */

import * as actionTypes from "../constants/ActionTypes";
import fetch from 'isomorphic-fetch';

export function addTodoAction(text){
    return {
        type : actionTypes.ADD_TODO,
        payload : {text}
    }
}

export function completeTodoAction(index){
    return {
        type : actionTypes.COMPLETE_TODO,
        payload : {index}
    }
}

export function switchFileAction(filter){
    return {
        type : actionTypes.SWITCH_FILTER,
        payload : {filter}
    }
}

export function requestTodos(){
    return {
        type : actionTypes.REQUEST_TODOS
    }
}

export function receiveTodos(todos){
    return {
        type : actionTypes.RECEIVE_TODOS,
        payload : {todos}
    }
}

/**
 * 采用fetch标准方案 ：
 *  	https://developer.mozilla.org/en/docs/Web/API/Fetch_API
 *  	https://github.com/matthew-andrews/isomorphic-fetch
 * [fetchTodos description]
 * @return {[type]} [description]
 */
export function fetchTodos(){
    let fetchUrl = "/n/todo/list";
    return function(dispatch){
        dispatch(requestTodos());
        return fetch(fetchUrl)
                .then(function(response){
                    return response.json();
                })
                .then( (response) => dispatch(receiveTodos(response)));
    }
}

export function calAdd(value){
    return {
        type : actionTypes.CAL_ADD,
        payload : {
            value
        }
    }
}

export function calMinus(value){
    return {
        type : actionTypes.CAL_MINUS,
        payload : {
            value
        }
    }
}
