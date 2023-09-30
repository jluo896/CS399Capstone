import React from "react";
import './GradeMenu.css';

import { Link } from "react-router-dom";
const studentInfo = [
    {
        "courseCode": "CP2077",
        "assignmenttitle": "Assignment1",
        "stdname": "Warren Buffet",
        "stdid": "1930",
        "marker": "Warren Buffet",
    }, {
        "courseCode": "CP240x",
        "assignmenttitle": "Assignment1",
        "stdname": "Warren Buffet",
        "stdid": "1930",
        "marker": "Warren Buffet",
    },
    {
        "courseCode": "CP2066",
        "assignmenttitle": "Assignment1",
        "stdname": "Warren Buffet",
        "stdid": "1930",
        "marker": "Warren Buffet",
    },

]
export default function GradeMenuN() {
    return (
        <div>
            <Link to="/" class= "back">Back</Link>
            <div class="menubox">
                <div class="sort-row">
                    <p>Rows for future sort functions</p>
                </div>
                <div class="library">

                    <href class="student-item"><Link to="/grading/page1">Warren Buffet, graded</Link></href>
                    {studentInfo.map(value =>
                        <href class="student-item">{value.courseCode}, ungraded</href>)}
                </div>


            </div>
        </div>
    )
};