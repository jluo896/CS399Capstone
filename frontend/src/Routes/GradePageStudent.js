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
    const [students, setStudents] = useState([]);
    const [studentGrades, setStudentGrades] = useState([]);
    const [rubric, setRubric] = useState([]);

    const [prevId, setPrevId] = useState(null);
    const [nextId, setNextId] = useState(null);

    const [replaceMarkForm, setReplaceMarkForm] = useState([{"questionId": null, "oldMark": null, "newMark": null}]);
    const [replaceCommentForm, setReplaceCommentForm] = useState([{"questionId": null, "oldComment": null, "newComment": null}]);
    const [checkedStudentIds, setCheckedStudentIds] = useState([]);

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
        alert("All changes saved!")
    };

    const handleReplaceMarkChange = (index, e) => {
        let data = [...replaceMarkForm];
        data[index][e.target.name] = e.target.value;
    }

    const handleReplaceMarkSubmit = () => {
        let data = replaceMarkForm[0];
        if (!(data.questionId === null || data.oldMark === null || data.newMark === null || data.questionId === '' || data.oldMark === '' || data.newMark === '')) {
            axios.post(API + `/grading/updateGradeWithMark/${courseId}/${assignmentId}`, data).catch(err => console.log(err));
            alert("All Marks Updated!");
        } else {
            alert("Empty fields!");
        }
    }

    const handleReplaceSelectedMarkSubmit = () => {
        let data = replaceMarkForm[0];
        if (!(data.questionId === null || data.oldMark === null || data.newMark === null || data.questionId === '' || data.oldMark === '' || data.newMark === '')) {
            checkedStudentIds.forEach(id => axios.post(API + `/grading/updateGradeWithMarkAndId/${courseId}/${assignmentId}/${id}`, data).then(res => console.log(res)).catch(err => console.log(err)));
            alert("All Marks Updated!");
        } else {
            alert("Empty fields!");
        }
    }

    const handleReplaceCommentChange = (index, e) => {
        let data = [...replaceCommentForm];
        data[index][e.target.name] = e.target.value;
    }

    const handleReplaceCommentSubmit = () => {
        let data = replaceCommentForm[0];
        if (!(data.questionId === null || data.oldComment === null || data.newComment === null || data.questionId === '' || data.oldComment === '' || data.newComment === '')) {
            axios.post(API + `/grading/updateCommentsWithComment/${courseId}/${assignmentId}`, data).catch(err => console.log(err));
            alert("All Comments Updated!");
        } else {
            alert("Empty fields!");
        }
    }

    const handleReplaceSelectedCommentSubmit = () => {
        let data = replaceCommentForm[0];
        console.log(data, checkedStudentIds)
        if (!(data.questionId === null || data.oldComment === null || data.newComment === null || data.questionId === '' || data.oldComment === '' || data.newComment === '')) {
            checkedStudentIds.forEach(id => axios.post(API + `/grading/updateCommentsWithCommentAndId/${courseId}/${assignmentId}/${id}`, data).catch(err => console.log(err)));
            alert("All Comments Updated!");
        } else {
        alert("Empty fields!");
        }
    }

    const handleStudentCheckbox = (e) => {
        if (e.target.checked) {
            setCheckedStudentIds([...checkedStudentIds, e.target.value]);
        } else {
            setCheckedStudentIds(checkedStudentIds.filter((id) => id !== e.target.value));
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
        
    }

    const showPopup = () => {
        alert("Everything is filled.");
    };

    const refreshPage = () => {
        setTimeout(()=>{
            window.location.reload(false);
        }, 500);
    }

    useEffect(() => {
        axios.get(API + `/grading/courses/${courseId}`).then(res => setCourse(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/assignments/${courseId}/${assignmentId}`).then(res => setAssigment(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/rubrics/${courseId}/${assignmentId}`).then(res => setRubric(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/${courseId}/${assignmentId}`).then(res => setStudents(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/${courseId}/${assignmentId}/${studentId}`).then(res => setStudent(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/prevId/${courseId}/${assignmentId}/${studentId}`).then(res => setPrevId(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/students/nextId/${courseId}/${assignmentId}/${studentId}`).then(res => setNextId(res.data)).catch(err => console.log(err));
        axios.get(API + `/grading/student-grades/${courseId}/${assignmentId}/${studentId}`).then(res => {setStudentGrades(res.data);loadStudentGrades(res.data);}).catch(err => console.log(err));
    }, [])

    return (
        <div>
            {/*console.log(studentGrades)*/}
            <Link to={`/grading/menu`} class= "back">Back</Link>
            <div class="row">
            <div class="menubox2">
                <h1>Students</h1>
                <div className="library">
                    {students.map(value => (
                        <div>
                        <Link to={`/grading/page/${value.courseId}/${value.assignmentId}/${value.studentId}`} onClick={refreshPage}>
                            <div className="student-item" key={`${value.studentId}`}>
                                [{value.studentId}] [{value.studentUpi}] {value.studentName}
                                
                            </div>
                        </Link>
                        <input value={value.studentId} type="checkbox" class="student-checkbox" onChange={handleStudentCheckbox} />
                        </div>
                    ))}
                </div>
            </div>
            <div class="blank-container">
                <div class="grade-header">
                    <div class="grade-title">
                        <p>[{course.courseId}] {course.courseName} | [{assignment.assignmentId}] {assignment.assignmentName}</p>
                    </div>
                    
                </div>
                { studentId !== "0" ?
                <div>
                    <div class="grade-details">
                        [{student.studentId}] ({student.studentUpi}) {student.studentName}
                    </div>
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
                                            <label class="comment-content">{comment}</label>
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
                    
                    <div className="btn-block"><button class="button-link" type="button" onClick={handleCommitButtonClick}>Commit Change</button></div>
                    <div className="btn-block"><button class="button-link" type="button" onClick={showPopup}>Check</button></div>
                    <div className="button-container">
                        <div className="btn-block"><button type="button"><Link reloadDocument to={`/grading/page/${course.courseId}/${assignment.assignmentId}/${prevId}`} class="button-link" type="button">Prev</Link></button></div>
                        <div className="btn-block"><button type="button"><Link reloadDocument to={`/grading/page/${course.courseId}/${assignment.assignmentId}/${nextId}`} class="button-link" type="button">Next</Link></button></div>
                    </div>
                </div>
                : <div>Click on a student to start!</div>}
            </div>
            <div class="menubox2">
                <b>Replace marks</b>
                <div id="replace-marks">
                    {
                        replaceMarkForm.map((input, index) => 
                            <div key={index}>
                                <label>Question Id</label>
                                <select type="text" name={"questionId"} value={input.questionId} onChange={(e) => handleReplaceMarkChange(index, e)}>
                                    <option value=""></option>
                                    {rubric.slice(1,rubric.length).map(value => (
                                        <option value={value.questionId}>{value.questionId}</option>
                                    ))}
                                </select><br/>
                                <label>Old Mark</label>
                                <input type="text" name={"oldMark"} value={input.oldMark} onChange={(e) => handleReplaceMarkChange(index, e)}/><br/>
                                <label>New Mark</label>
                                <input type="text" name={"newMark"} value={input.newMark} onChange={(e) => handleReplaceMarkChange(index, e)}/><br/>
                                <div className="btn-block">
                                    <button class="button-link" type="button" onClick={handleReplaceMarkSubmit}>Update All</button>
                                    <button class="button-link" type="button" onClick={handleReplaceSelectedMarkSubmit}>Update Selected</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <b>Replace comments</b>
                <div id="replace-comments">
                    {
                        replaceCommentForm.map((input, index) => 
                            
                            <div key={index}>
                                <label>Question Id</label>
                                <select type="text" name={"questionId"} value={input.questionId} onChange={(e) => handleReplaceCommentChange(index, e)}>
                                    <option value=""></option>
                                    {rubric.slice(1,rubric.length).map(value => (
                                        <option value={value.questionId}>{value.questionId}</option>
                                    ))}
                                </select><br/>
                                <label>Old Comment</label>
                                <input type="text" name={"oldComment"} value={input.oldMark} onChange={(e) => handleReplaceCommentChange(index, e)}/><br/>
                                <label>New Comment</label>
                                <input type="text" name={"newComment"} value={input.newMark} onChange={(e) => handleReplaceCommentChange(index, e)}/><br/>
                                <div className="btn-block">
                                    <button class="button-link" type="button" onClick={handleReplaceCommentSubmit}>Submit</button>
                                    <button class="button-link" type="button" onClick={handleReplaceSelectedCommentSubmit}>Update Selected</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            </div>
        </div>
    );
};