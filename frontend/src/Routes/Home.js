import React from "react";
import './Routes.css';
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div><Link to="/rubric">Rubric</Link></div>
            <div><Link to="/upload">Upload</Link></div>
            <div><Link to="/grading">Grading</Link></div>
        </div>
    )
};