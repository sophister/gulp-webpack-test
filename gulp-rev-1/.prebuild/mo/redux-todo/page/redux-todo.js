import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "../../../../isomorphic/components/todo/containers/App";
import createStoreWithMiddleware from "../../../../isomorphic/components/todo/store/middlewareStore";
import { Provider } from "react-redux";
import todoReduce from "../../../../isomorphic/components/todo/reduces/reduces";

let store = createStoreWithMiddleware(todoReduce);
let rootDom = document.getElementById("redux-container");

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>
    ,
    rootDom
);
