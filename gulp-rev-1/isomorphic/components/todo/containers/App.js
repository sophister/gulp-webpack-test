import ReactDOM from "react-dom";
import React, {Component} from "react";
import TodoContainer from "./TodoContainer";
import CalContainer from "./CalContainer";

class App extends Component{

    componentDidMount(){

    }

    /**
     * 页面应该有多个Container组成：每个Container从state中选择一部分需要的数据
     */

    render(){
        return (
            <div className="app-container">
                <TodoContainer />
                <CalContainer />
            </div>
        )
    }
}

export default App;
