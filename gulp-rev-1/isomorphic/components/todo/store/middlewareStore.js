
import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);


//注意export的写法 ： http://es6.ruanyifeng.com/#docs/module
//export { createStoreWithMiddleware };

export default createStoreWithMiddleware;
