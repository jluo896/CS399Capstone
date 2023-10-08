import React from "react";
import './GradeMenu.css';
import { Link } from "react-router-dom";

const studentInfos = [
    {
        "assignmentId": "520",
        "courseCode": "CP2077",
        "assignmenttitle": "Assignment1",
        "stdname": "Warren Buffet",
        "stdid": "1930",
        "marker": "Warren Buffet",
    },
    {
        "assignmentId": "521",
        "courseCode": "CP2077",
        "assignmenttitle": "Assignment2",
        "stdname": "John Doe",
        "stdid": "1931",
        "marker": "John Doe",
    },
    {
        "assignmentId": "522",
        "courseCode": "CP2077",
        "assignmenttitle": "Assignment3",
        "stdname": "Jane Smith",
        "stdid": "1932",
        "marker": "Jane Smith",
    },
];

export default function GradeMenu() {
    return (
        <div>
            <Link to="/" class= "back">Back</Link>
            <div class="menubox">
                <div class="sort-row">
                    <p>Rows for future sort functions</p>
                </div>
                <div className="library">
                    {studentInfos.map(value => (
                        <div className="student-item" key={value.assignmentId}>
                            <Link to={`/grading/page1/1/${value.assignmentId}`}>
                                {value.assignmenttitle}, {value.stdname}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
