import React, {useState, useEffect} from "react";
import './GradeMenu.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function GradeMenuSudents() {
    const API = "http://localhost:5000";
    const [courses, setCourses] = useState([]);
    const [assignments, setAssigments] = useState([]);
    const [students, setStudents] = useState([]);

    let {courseId, assignmentId} = useParams();
    //console.log(courseId, assignmentId)

    useEffect(() => {
        axios.get(API + `/grading/students/${courseId}/${assignmentId}`).then(res => setStudents(res.data)).catch(err => console.log(err));
    }, [])

    return (
        <div>
            <Link to="/grading/menu" class= "back">Back</Link>
            <div class="menubox">
                <h1>Students</h1>
                <div className="library">
                    {students.map(value => (
                        <div className="student-item" key={`${value.studentId}`}>
                            <Link to={`/grading/page/${value.courseId}/${value.assignmentId}/${value.studentId}`}>
                            [{value.studentId}] [{value.studentUpi}] {value.studentName}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
