import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function GradeMenuSummary() {
    const API = "http://localhost:5000";

    const [course, setCourse] = useState({});
    const [assignment, setAssigment] = useState({});
    const [students, setStudents] = useState([]);
    const [studentGrades, setStudentGrades] = useState([]);

    let {courseId, assignmentId} = useParams();

    useEffect(() => {
        axios.get(API + `/grading/courses/${courseId}`).then(res => setCourse(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/assignments/${courseId}/${assignmentId}`).then(res => setAssigment(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/${courseId}/${assignmentId}`).then(res => setStudents(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/student-grades/${courseId}/${assignmentId}`).then(res => setStudentGrades(res.data)).catch(err => console.log(err));
        console.log(studentGrades);
    }, [])

    return (
        <div class="blank-container2">
            <Link to={`/grading/menu`} class= "back2">Back</Link>
            <table>
                <tr>
                    <th>Student Id</th>
                    <th>Student Upi</th>
                    <th>Student Name</th>
                    <th>Question Id</th>
                    <th>Mark</th>
                    <th>Comment</th>
                </tr>
                {studentGrades.map(row => (
                    <tr>
                        <td>{row.studentId}</td>
                        <td>{students.filter(student => student.studentId === row.studentId)[0].studentUpi}</td>
                        <td>{students.filter(student => student.studentId === row.studentId)[0].studentName}</td>
                        <td>{row.questionId}</td>
                        <td>{row.mark}</td>
                        <td>{row.comment}</td>
                    </tr>
                ))}
            </table>
        </div>
    );};