
import React, {Component} from "react";

/**
 *  <Dialog show="" onCloseClick="" title="">
 *  	<p>this is a test</p>
 *  </Dialog>
 */

class Dialog extends Component{

    render(){
        return (
            <div class="dialogWrapper">
                <div class="dialogHeader">
                    <span class="dialogTitle">
                        {}
                    </span>
                    <i class="dialogCloseIcon"></i>
                </div>
                <div class="dialogContent">

                </div>
            </div>
        )
    }
}

export default Dialog;
