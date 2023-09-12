import $ from "jquery";
import React, {Component, createRef} from "react";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

class Rubric extends Component {
    fb = createRef();
    componentDidMount() {
        $(this.fb.current).formBuilder();
    }
    render() {
        return (
            <div id="fb-editor" ref={this.fb}></div>
        )
    }
};

export default Rubric

/*
export default function Rubric() {
    com
    return (
        <div>
            <p>rubric</p>
        </div>
    )
};
*/