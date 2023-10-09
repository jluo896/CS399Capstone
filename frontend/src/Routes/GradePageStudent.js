import React, { useState, useEffect } from "react";
import './GradePage1.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function GradePageStudent() {
    const API = "http://localhost:5000";

    const [formData, setFormData] = useState({});
    const [course, setCourse] = useState({});
    const [assignment, setAssigment] = useState({});
    const [student, setStudent] = useState({});
    const [studentGrades, setStudentGrades] = useState([]);
    const [rubric, setRubric] = useState([]);
    const [prevId, setPrevId] = useState(null);
    const [nextId, setNextId] = useState(null);

    const [replaceMarkForm, setReplaceMarkForm] = useState([{"questionId": null, "oldMark": null, "newMark": null}]);

    let {courseId, assignmentId, studentId} = useParams();

    const handleInputChange = (questionName, type, value, courseId, assignmentId, studentId, questionId) => {
        setFormData(prevData => ({
            ...prevData,
            [questionName]: {
                ...prevData[questionName],
                [type]: value,
                "courseId": courseId,
                "assignmentId": assignmentId,
                "studentId": studentId,
                "questionId": questionId,
            }
        }));
    };
    const saveComment = (courseId, assignmentId, questionId) => {
        const comment = formData[questionId]?.comment;
        axios.post(API + `/grading/addCommentToQuestion/${courseId}/${assignmentId}/${questionId}`, {"comment":comment}).catch(err => console.log(err));
    };

    const handleCommitButtonClick = () => {
        for (let i=1;i<=Object.keys(formData).length;i++) {
            axios.post(API + "/grading/postGrades", formData[i]).catch(err => console.log(err));
        }
    };

    const handleReplaceMarkChange = (index, e) => {
        let data = [...replaceMarkForm];
        data[index][e.target.name] = e.target.value;
    }

    const handleReplaceMarkSubmit = () => {
        let data = replaceMarkForm[0];
        if (!(data.questionId === null || data.oldMark === null || data.newMark === null || data.questionId === '' || data.oldMark === '' || data.newMark === '')) {
            axios.post(API + `/grading/updateGradeWithMark/${courseId}/${assignmentId}`, data).catch(err => console.log(err));
        }
    }

    const loadStudentGrades = (data) => {
        
        data.map(value => setFormData(prevData => ({
                ...prevData,
                [value.questionId]: {
                    "mark": value.mark,
                    "comment": value.comment,
                    "courseId": value.courseId,
                    "assignmentId": value.assignmentId,
                    "studentId": value.studentId,
                    "questionId": value.questionId,
                }
            }))
        )
        console.log(formData)
        
    }

    const showPopup = () => {
        alert("Everything is filled.");
    };

    useEffect(() => {
        axios.get(API + `/grading/courses/${courseId}`).then(res => setCourse(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/assignments/${courseId}/${assignmentId}`).then(res => setAssigment(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/rubrics/${courseId}/${assignmentId}`).then(res => setRubric(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/${courseId}/${assignmentId}/${studentId}`).then(res => setStudent(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/prevId/${courseId}/${assignmentId}/${studentId}`).then(res => setPrevId(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/nextId/${courseId}/${assignmentId}/${studentId}`).then(res => setNextId(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/student-grades/${courseId}/${assignmentId}/${studentId}`).then(res => {setStudentGrades(res.data);loadStudentGrades(res.data);}).catch(err => console.log(err));
        
        //console.log(prevId, nextId);
    }, [])

    return (
        <div>
            {/*console.log(studentGrades)*/}
            <Link to={`/grading/menu/${course.courseId}/${assignment.assignmentId}`} class= "back">Back</Link>
            <div class="blank-container">
                
                    <div class="grade-header">
                        <div class="grade-title">
                            <p>[{course.courseId}] {course.courseName} | [{assignment.assignmentId}] {assignment.assignmentName}</p>
                        </div>
                        <div class="grade-details">
                            [{student.studentId}] ({student.studentUpi}) {student.studentName}
                        </div>
                    </div>
                <div>
                    <ul>
                        {rubric.slice(1,rubric.length).map(value => (
                             <div className="question" key={value.title}>
                                <label>[{value.questionId}] {value.title}</label>
                                <div>
                                    {value.marks.split(',').map(mark =>
                                        <span key={mark}>
                                            <input
                                                className="question-radio"
                                                type="radio"
                                                name={value.title}
                                                value={mark}
                                                checked={formData[value.questionId]?.mark === mark}
                                                onChange={() => handleInputChange(value.questionId, 'mark', mark, course.courseId, assignment.assignmentId, student.studentId, value.questionId)}
                                            />
                                            <label>{mark}</label>
                                        </span>
                                    )}
                                    <input
                                        className="question-numberinput"
                                        type="text"
                                        name={value.title}
                                        placeholder={'Other'}
                                        value={formData[value.questionId]?.mark || ''}
                                        onChange={(e) => handleInputChange(value.questionId, 'mark', e.target.value, course.courseId, assignment.assignmentId, student.studentId, value.questionId)}
                                    />
                                    <br />
                                    <hr />
                                </div>
                                {value.comments.split(',').map(comment =>
                                    <span key={comment.value}>
                                        <div className="question-comments">
                                            <input
                                                type="radio"
                                                name={value.title+' comment'}
                                                value={comment}
                                                checked={formData[value.questionId]?.comment === comment}
                                                onChange={() => handleInputChange(value.questionId, 'comment', comment, course.courseId, assignment.assignmentId, student.studentId, value.questionId)}
                                            />
                                            <label>{comment}</label>
                                        </div>
                                    </span>
                                )}
                                <textarea
                                    type="text"
                                    name={value.title+' comment'}
                                    placeholder={'Other'}
                                    value={formData[value.questionId]?.comment || ''}
                                    onChange={(e) => handleInputChange(value.questionId, 'comment', e.target.value, course.courseId, assignment.assignmentId, student.studentId, value.questionId)}
                                />
                                <button type="button" onClick={() => saveComment(course.courseId, assignment.assignmentId, value.questionId)} > Save Comment </button>
                            </div>
                        ))}
                    </ul>
                    <div className="btn-block">
                        <button class="button-link" type="button" onClick={handleCommitButtonClick}>Commit Change</button>
                    </div>
                    <div className="btn-block">
                        <button class="button-link" type="button" onClick={showPopup}>Check</button>
                    </div>
                    <div className="btn-block">
                        <button type="button"><Link reloadDocument to={`/grading/page/${course.courseId}/${assignment.assignmentId}/${prevId}`} class="button-link" type="botton">Prev</Link></button>
                    </div>
                    <div className="btn-block">
                        <button type="button"><Link reloadDocument to={`/grading/page/${course.courseId}/${assignment.assignmentId}/${nextId}`} class="button-link" type="botton">Next</Link></button>
                    </div>
                </div>
            </div>
            <div class="blank-container">
                <b>Replace marks</b>
                <div id="replace-marks">
                    {
                        replaceMarkForm.map((input, index) => 
                            <div key={index}>
                                <label>Question Id</label>
                                <input type="text" name={"questionId"} value={input.questionId} onChange={(e) => handleReplaceMarkChange(index, e)}/>
                                <label>Old Mark</label>
                                <input type="text" name={"oldMark"} value={input.oldMark} onChange={(e) => handleReplaceMarkChange(index, e)}/>
                                <label>New Mark</label>
                                <input type="text" name={"newMark"} value={input.newMark} onChange={(e) => handleReplaceMarkChange(index, e)}/>
                                <div className="btn-block">
                                    <button class="button-link" type="button" onClick={handleReplaceMarkSubmit}>Submit</button>
                                </div>
                            </div>
                        )
                    }
                    </div>
            </div>
        </div>
    );
};