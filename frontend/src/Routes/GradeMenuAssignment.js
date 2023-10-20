import React, {useState, useEffect} from "react";
import './GradeMenu.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import { saveAs } from "file-saver";

export default function GradeMenuAssignment() {
    const API = "http://localhost:5000";
    const [courses, setCourses] = useState([]);
    const [assignments, setAssigments] = useState([]);

    function download(courseId, assignmentId) {
        //alert("hello")
        
    }

    useEffect(() => {
        axios.get(API + "/grading/courses").then(res => setCourses(res.data)).catch(err => console.log(err));
        axios.get(API + "/grading/assignments").then(res => setAssigments(res.data)).catch(err => console.log(err));
    }, [])

    return (
        <div>
            <Link to="/" class= "back">Back</Link>
            <div class="menubox">
                <h1>Assignments</h1>
                <div className="library">
                    {assignments.map(value => (
                        <Link to={`/grading/page/${value.courseId}/${value.assignmentId}/0`} class="asignment-item">
                            <div className="student-item" key={`${value.courseId},${value.assignmentId}`}>
                                [{value.courseId}] {courses.filter((c) => c.courseId === value.courseId)[0].courseName} - [{value.assignmentId}] {value.assignmentName}
                                
                                <button class="summary-button" onClick={() => {
                                    axios.get(API + `/grading/student-grades/${value.courseId}/${value.assignmentId}`).then(res => {
                                        console.log(res);
                                        const file = new Blob([Papa.unparse(res.data)],{ type: "text/csv" });
                                        saveAs(file, `[${value.courseId}][${value.assignmentId}]${value.assignmentName}.csv`);
                                }).catch(err => console.log(err))
                                }}>
                                <Link to={`/grading/menu`} >
                                    Download
                                    </Link>
                                </button>
                                <button class="summary-button">
                                <Link to={`/grading/menu-summary/${value.courseId}/${value.assignmentId}`}>
                                    Summary
                                </Link>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
