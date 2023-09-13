import React, {useState} from "react";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import Home from "./Routes/Home";
import Rubric from "./Routes/Rubric";
import Marking from "./Routes/Marking";

function App() {
    return (
        <Router>
            <nav>
                <h1>GradePal</h1>
                <Link to="/">Back</Link>
            </nav>
            <br />
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/rubric" element={<Rubric/>} />
                <Route path="/marking" element={<Marking/>} />
            </Routes>
        </Router>
    )
}

export default App;