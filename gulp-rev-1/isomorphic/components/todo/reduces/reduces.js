//TODO : 增加自定义combineReducers方案  http://camsong.github.io/redux-in-chinese/docs/basics/Reducers.html
/**
 *
 * 参考文档 ：
 * 	http://camsong.github.io/redux-in-chinese/docs/basics/Reducers.html
 * 	http://camsong.github.io/redux-in-chinese/docs/api/combineReducers.html
 */

import {combineReducers} from "redux";
import {todoReduce, todoFilterReduce} from "./todos";
import calculateReduce from "./calculate";

//随着应用变得复杂，需要对 reducer 函数 进行拆分，拆分后的每一块独立负责管理 state 的一部分。
const todoAppReduce = combineReducers({
    todos : todoReduce,
    showFilter : todoFilterReduce,
    calValue : calculateReduce
});

export default todoAppReduce;
