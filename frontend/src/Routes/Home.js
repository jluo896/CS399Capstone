import React from "react";

import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div class = "home">
            <div class = "div-button-l"><Link to="/rubric" class = "button-link" type = "botton">Rubric</Link></div>
            <div class = "div-button-c"><Link to="/upload" class = "button-link" type = "botton">Upload</Link></div>
            <div class = "div-button-r"><Link to="/grading/menu" class = "button-link" type = "botton">Grading</Link></div>
        </div>
    )
};