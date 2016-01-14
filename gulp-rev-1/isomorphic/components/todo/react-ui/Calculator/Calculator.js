
import React, {Component} from "react";

/**
 *  <Calculator base="2"/>
 */

class Calculator extends Component{

    _handleBtnClick(type, e){
        let calInfo = {
            value : this.props.base,
            type
        }
        this.props.onCalBtnClick(calInfo);
    }

    render(){
        return (
            <div className="calculator-component">
                <div className="cal-content">
                    <span className="cal-value">{this.props.calValue}</span>
                </div>
                <div className="cal-control">
                    <button onClick={ (e) => this._handleBtnClick("ADD", e) }>累加</button>
                    <button onClick={ (e) => this._handleBtnClick("MIN", e) }>递减</button>
                </div>
            </div>
        )
    }
}

export default Calculator;
