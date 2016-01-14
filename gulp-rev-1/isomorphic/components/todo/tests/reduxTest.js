
import {createStore} from "redux";
import todoAppReduce from "../reduces/reduces";
import * as todoActions from "../actions/action";

let todoStore = createStore(todoAppReduce);

console.log(todoStore.getState());

let unSubscribe = todoStore.subscribe( () => {
    console.log(todoStore.getState());
});

todoStore.dispatch(todoActions.addTodoAction("第一条todo记录"));
todoStore.dispatch(todoActions.addTodoAction("第二条todo记录"));
todoStore.dispatch(todoActions.addTodoAction("第三条todo记录"));
todoStore.dispatch(todoActions.completeTodoAction(1));
todoStore.dispatch(todoActions.completeTodoAction(0));

unSubscribe();
