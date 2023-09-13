import React from "react";

import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div><Link to="/rubric">Rubric</Link></div>
            <div><Link to="/marking">Marking</Link></div>
        </div>
    )
};