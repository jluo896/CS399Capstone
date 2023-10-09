import React, {useState, useEffect} from "react";
import './GradeMenu.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function GradeMenuAssignment() {
    const API = "http://localhost:5000";
    const [courses, setCourses] = useState([]);
    const [assignments, setAssigments] = useState([]);

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
                        <div className="student-item" key={`${value.courseId},${value.assignmentId}`}>
                            <Link to={`/grading/menu/${value.courseId}/${value.assignmentId}`}>
                                [{value.courseId}] {courses.filter((c) => c.courseId === value.courseId)[0].courseName} - [{value.assignmentId}] {value.assignmentName}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
