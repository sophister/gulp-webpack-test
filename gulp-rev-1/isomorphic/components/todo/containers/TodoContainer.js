import React, {Component} from "react";
import AddTodo from "../react-ui/AddTodo";
import TodoList from "../react-ui/TodoList";
import TodoFooter from "../react-ui/TodoFooter";
import TodoHeader from "../react-ui/TodoHeader/TodoHeader";
import * as actionCreates from "../actions/action";
import { connect } from "react-redux";
import * as FilterConstants from "../constants/TodoFilters";

class TodoContainer extends Component{

    componentDidMount(){
        console.log("componentDidMount call");
        this.props.dispatch(actionCreates.fetchTodos()).then( () => {
            console.log("callback call");
            console.log(this.props.todos);
        });
    }

    _handleAddTodoClick(text){
        console.log("addTodoClick!!!");
        //connect会自动注入 mapStateToProps的属性以及dispatch方法到props上
        this.props.dispatch(actionCreates.addTodoAction(text));
    }

    _handleTodoListClick(index){
        console.log(`${index} item 点击了!!!`);
        this.props.dispatch(actionCreates.completeTodoAction(index));
    }

    _handleTodoFooterClick(type){
        console.log(`筛选type ${type}`);
        this.props.dispatch(actionCreates.switchFileAction(type));
    }

    render(){
        //console.log("TodoContainer render method called");
        return (
            <div className="todo-container">
                <TodoHeader />
                <AddTodo onAddTodoClick={ (text) => this._handleAddTodoClick(text) }/>
                <TodoList todos={this.props.todos} onTodoListClick={ (index) => this._handleTodoListClick(index) } />
                <TodoFooter onTodoFooterClick={ (type) => this._handleTodoFooterClick(type) } />
            </div>
        )
    }
}

function seleteShowTodos(todos, filter){
    switch(filter){
        case FilterConstants.ALL:
            return todos;
            break;
        case FilterConstants.COMPLETED:
            return todos.filter( (todo) => todo.complete);
            break;
        case FilterConstants.ACTIVE:
            return todos.filter( (todo) => !todo.complete);
            break;
    }
}

/**
 * 从State中返回App Component需要使用的props
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function seletePropsFromState(state){
    return {
        todos : seleteShowTodos(state.todos, state.showFilter),
        showFilter : state.showFilter
        // calValue : state.calValue  增加该属性之后：计算器修改会导致该container重新render
    }
}

export default connect(seletePropsFromState)(TodoContainer);
