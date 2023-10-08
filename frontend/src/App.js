import React, {useState} from "react";
import './APP.css';
import {BrowserRouter as Router, Routes, Route, Link, useParams} from "react-router-dom"

import Home from "./Routes/Home";
import Rubric from "./Routes/Rubric";
import Upload from "./Routes/Upload";
import GradeMenu from "./Routes/GradeMenu";
import GradePage from "./Routes/GradePage";
import GradePage1 from "./Routes/GradePage1";
import GradePageN from "./Routes/GradePageN";
import GradeMenuN from "./Routes/GradeMenuchecked";

function App() {
    return (
        <Router>
            <nav>
              <Link to="/" class="title">GradePal</Link>
            </nav>
            <br />
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/rubric" element={<Rubric/>} />
                <Route path="/upload" element={<Upload/>} />
                <Route path="/grading/menu" element={<GradeMenu/>} />
                <Route path="/grading/page" element={<GradePage />} />
                <Route path="/grading/page1/:rbkId?/:stdId?" element={<GradePage1 />} />
                <Route path="/grading/menuN" element={<GradeMenuN />} />
                <Route path="/grading/pageN/:rbkId?/:stdId?" element={<GradePageN />} />
            </Routes>
        </Router>
    )
}

export default App;