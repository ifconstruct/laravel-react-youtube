import React, {createElement} from "react";
import { createRoot } from 'react-dom/client';
import eventBus from "../components/eventBus";


'use strict';

const e = React.createElement;

class EditModeButton extends React.Component {
    constructor(props) {
        super(props);
       this.state = { mode : "default"}
    }

    changeEdit(mode){
        this.setState( {mode: mode });
        eventBus.dispatch("mode", { message: mode });
    }
    render() {
        if (this.state.mode === "default") {
            return e(
                "button",
                {
                    className: "normal-click",
                    onClick: () => {this.changeEdit("edit")},
                },
                "Edit"
            );
        }else{
            return e(
                "button",
                {
                    className: "avoid-click",
                    onClick: () => {this.changeEdit("default")},
                },
                "Done"
            );
		}
    }
}

export default EditModeButton;
