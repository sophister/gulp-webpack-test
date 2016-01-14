
import React, {Component} from "react";
import ReactDOM, {findDOMNode} from "react-dom";

export default class AddTodo extends Component{

    handleClick(e){
        let inputNode = findDOMNode(this.refs.input);
        let todoText = inputNode.value.trim();
        this.props.onAddTodoClick(todoText);
        inputNode.value = "";
    }

    render(){
        return (
            <div>
                <input type="text" ref="input" placeholder="添加todo"/>
                <button onClick={ (e) => this.handleClick(e)} >添加todo</button>
            </div>
        )
    }
}
