
import React, {Component} from "react";

let logoImg = require("./assets/todoLogo.png");

export default class TodoHeader extends Component{

    componentDidMount(){
        this.refs.img.src = logoImg;
    }

    render(){
        return (
            <img ref="img" />
        )
    }
}
