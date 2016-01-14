import React, {Component} from "react";
import { connect } from "react-redux";
import * as actionCreates from "../actions/action";
import Calculator from "../react-ui/Calculator/Calculator";

class CalContainer extends Component{

    _handleCalBtnClick(calInfo){
        if(calInfo.type == "ADD"){
            this.props.dispatch(actionCreates.calAdd(calInfo.value));
        }else{
            this.props.dispatch(actionCreates.calMinus(calInfo.value));
        }
    }

    render(){
        //console.log("CalContainer render method called");
        return (
            <Calculator onCalBtnClick={ (calInfo) => this._handleCalBtnClick(calInfo) } base="2" calValue={this.props.calValue}/>
        )
    }
}

function selectPropsFromState(state){
    return {
        calValue : state.calValue
    };
}

export default connect(selectPropsFromState)(CalContainer);
