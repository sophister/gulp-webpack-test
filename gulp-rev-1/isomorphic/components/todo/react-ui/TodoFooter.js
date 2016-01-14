import React, {Component} from "react";
import * as TodoFilters from "../constants/TodoFilters";


export default class TodoFooter extends Component{

    renderFilter(type, name){
        return (
            <a href="#" onClick={ (e) => {
                    e.preventDefault();
                    this.props.onTodoFooterClick(type);
                }} > { name ? name : type} </a>
        );
    }

    render(){
        return (
            <span>
                筛选 ：
                {"   "}
                {this.renderFilter(TodoFilters.ALL)}
                {"  , "}
                {this.renderFilter(TodoFilters.COMPLETED)}
                {"  , "}
                {this.renderFilter(TodoFilters.ACTIVE)}
            </span>
        )
    }
}
