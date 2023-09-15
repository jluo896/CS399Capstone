import React from "react";

import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div><Link to="/rubric">Rubric</Link></div>
            <div><Link to="/upload">Upload</Link></div>
            <div><Link to="/grademenu">Grading</Link></div>
        </div>
    )
};