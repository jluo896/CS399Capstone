import React from "react";

import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div class = "home">
            <div><Link to="/rubric" class = "front" type = "botton">Rubric</Link></div>
            <div><Link to="/upload" class = "front">Upload</Link></div>
            <div><Link to="/grading/menu" class = "front">Grading</Link></div>
        </div>
    )
};