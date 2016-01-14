import React, {Component} from "react";

require("./TodoItem.less");

export default class TodoItem extends Component{
    handleItemClick(e){
        this.props.onTodoItemClick(this.props.index);
    }
    render(){
        let completeClass = this.props.complete ? "complete" : "";
        return (
            <li className={"todoItem " + completeClass} onClick={ (e) => this.handleItemClick(e) } >
                {this.props.text}
            </li>
        );
    }
}
