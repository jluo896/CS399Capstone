import React, {useState} from "react";
import './APP.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import Home from "./Routes/Home";
import Rubric from "./Routes/Rubric";
import Upload from "./Routes/Upload";
import GradeMenu from "./Routes/GradeMenu";
import GradePage from "./Routes/GradePage";
import GradePage1 from "./Routes/GradePage1";
import GradePageN from "./Routes/GradePageN";
import GradeMenuN from "./Routes/GradeMenuchecked";
import GradeMenuAssignment from "./Routes/GradeMenuAssignment";
import GradeMenuStudents from "./Routes/GradeMenuStudents";
import GradePageStudent from "./Routes/GradePageStudent";
import GradePageStudent2 from "./Routes/GradePageStudent2";
import GradeMenuSummary from "./Routes/GradeMenuSummary";

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
                {/*<Route path="/grading/menu" element={<GradeMenu/>} />
                <Route path="/grading/page" element={<GradePage />} />
                <Route path="/grading/page1" element={<GradePage1 />} />
                <Route path="/grading/menuN" element={<GradeMenuN />} />
                <Route path="/grading/pageN" element={<GradePage1 />} />*/}
                <Route path="/grading/menu" element={<GradeMenuAssignment/>} />
                <Route path="/grading/menu/:courseId/:assignmentId" element={<GradeMenuStudents/>} />
                <Route path="/grading/page/:courseId/:assignmentId/:studentId" element={<GradePageStudent/>} />
                <Route path="/grading/menu-summary/:courseId/:assignmentId" element={<GradeMenuSummary/>} />
            </Routes>
        </Router>
    )
}

export default App;