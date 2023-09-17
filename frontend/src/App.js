import React, {useState} from "react";
import './APP.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import Home from "./Routes/Home";
import Rubric from "./Routes/Rubric";
import Upload from "./Routes/Upload";
import GradeMenu from "./Routes/GradeMenu";
import GradePage from "./Routes/GradePage";

function App() {
    return (
        <Router>
            <nav>
                <h1 class="title">GradePal</h1>
                <Link to="/">Back</Link>
            </nav>
            <br />
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/rubric" element={<Rubric/>} />
                <Route path="/upload" element={<Upload/>} />
                <Route path="/grading/menu" element={<GradeMenu/>} />
                <Route path="/grading/page" element={<GradePage/>} />
            </Routes>
        </Router>
    )
}

export default App;