import React, { useState } from "react";
import './GradePage1.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rubric from "./Rubric";

export default function GradePage1() {
    //to be replaced with GradeMenu information.
    const studentInfo = [
        {   
            "assignmentId": "520",
            "courseCode": "CP2077",
            "assignmenttitle": "Assignment1",
            "stdname": "Warren Buffet",
            "stdid": "1930",
            "marker": "Warren Buffet",
        }
    ];
    const [formData, setFormData] = useState({});

    const handleInputChange = (questionName, type, value) => {
        setFormData(prevData => ({
            ...prevData,
            [questionName]: {
                ...prevData[questionName],
                [type]: value
            }
        }));
    };
    const saveComment = (questionName) => {
        const comment = formData[questionName]?.comment;
        const assignmentId = studentInfo[0].assignmentId;
        console.log('Saved Comment:', JSON.stringify([assignmentId, questionName, comment]));
    };

    const handleCommitButtonClick = () => {
        const assignmentId = studentInfo[0].assignmentId;
        const dataWithAssignmentId = {
            [assignmentId]: formData
        }
        console.log('Output:', JSON.stringify(dataWithAssignmentId));
        
    };

    // grading functions
    const rubrics = [
        {
            "type": "radio-group",
            "required": false,
            "label": "Question 1",
            "inline": false,
            "name": "radio-group-1695435674642-0",
            "access": false,
            "other": false,
            "values": [
                {
                    "label": "0",
                    "value": "comment 1",
                    "selected": false
                },
                {
                    "label": "1",
                    "value": "comment 2",
                    "selected": false
                },
                {
                    "label": "2",
                    "value": "comment 3",
                    "selected": false
                },
                {
                    "label": "",
                    "value": "comment 4",
                    "selected": false
                }
            ]
        },
        {
            "type": "select",
            "required": false,
            "label": "Question 2",
            "className": "form-control",
            "name": "select-1695435675690-0",
            "access": false,
            "multiple": false,
            "values": [
                {
                    "label": "0",
                    "value": "comment 1",
                    "selected": true
                },
                {
                    "label": "2",
                    "value": "comment 2",
                    "selected": false
                },
                {
                    "label": "4",
                    "value": "",
                    "selected": false
                },
                {
                    "label": "6",
                    "value": "",
                    "selected": false
                }
            ]
        }
    ];

    const showPopup = () => {
        alert("Everything is filled.");
    };

    return (
        //grading forms
        <div>
            <Link to="/" class= "back">Back</Link>
            <div class="blank-container">
                {
                    <div class="grade-header">
                        <div class="grade-title">
                            <p>Course Code: {studentInfo[0].courseCode} | Assignment: {studentInfo[0].assignmenttitle}</p>
                        </div>
                        <div class="grade-details">
                            <p>Student Name: {studentInfo[0].stdname}</p>
                            <p>Student Id: {studentInfo[0].stdid}</p>
                        </div>
                    </div>}
                <div>
                    <ul>
                        {rubrics.map(value =>
                            <div className="question" key={value.label}>
                                <label>{value.label}</label>
                                <div>
                                    {value.values.map(mark =>
                                        mark.label !== "" ?
                                            <span key={mark.label}>
                                                <input
                                                    className="question-radio"
                                                    type="radio"
                                                    name={value.label}
                                                    value={mark.label}
                                                    checked={formData[value.label]?.mark === mark.label}
                                                    onChange={() => handleInputChange(value.label, 'mark', mark.label)}
                                                />
                                                <label>{mark.label}</label>
                                            </span>
                                            : null
                                    )}
                                    <input
                                        className="question-numberinput"
                                        type="text"
                                        name={value.label}
                                        placeholder={'Other'}
                                        value={formData[value.label]?.mark || ''}
                                        onChange={(e) => handleInputChange(value.label, 'mark', e.target.value)}
                                    />
                                    <br />
                                    <hr />
                                </div>
                                {value.values.map(comment =>
                                    comment.value !== "" ?
                                        <span key={comment.value}>
                                            <div className="question-comments">
                                                <input
                                                    type="radio"
                                                    name={value.label+' comment'}
                                                    value={comment.name}
                                                    checked={formData[value.label]?.comment === comment.value}
                                                    onChange={() => handleInputChange(value.label, 'comment', comment.value)}
                                                />
                                                <label>{comment.value}</label>
                                            </div>
                                        </span>
                                        : null
                                )}
                                <textarea
                                    type="text"
                                    name={value.label+' comment'}
                                    placeholder={'Other'}
                                    value={formData[value.label]?.comment || ''}
                                    onChange={(e) => handleInputChange(value.label, 'comment', e.target.value)}
                                />
                                <button type="button" onClick={() => saveComment(value.label)} > Save Comment </button>
                            </div>
                        )}
                    </ul>
                    <div className="btn-block">
                        <button type="button" onClick={handleCommitButtonClick}><Link to="/grading/menuN" class="button-link" type="botton">Commit Change</Link></button>
                    </div>
                    <div className="btn-block">
                        <button type="button" onClick={showPopup}>Check</button>
                    </div>
                </div>
            </div>
        </div>
    );
};