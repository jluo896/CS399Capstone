import React from "react";
import './GradePage1.css';
import { Link } from "react-router-dom";
import Rubric from "./Rubric";

export default function GradePage1() {
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
    ]
    const studentInfo = [
        {
            "courseCode": "CP2077",
            "assignmenttitle": "Assignment1",
            "stdname": "Warren Buffet",
            "stdid": "1930",
            "marker": "Warren Buffet",
        }
    ]
    const showPopup = () => {
        alert("Everything is filled.");
    };

    return (
        //grading forms
        <div>
            <Link to="/">Back</Link>
            <div class="blank-container">
                <div class="grade-title">
                    <p>Course Code: {studentInfo[0].courseCode}</p>
                    <p>Assignment: {studentInfo[0].assignmenttitle}</p>
                </div>
                <div class="grade-details">
                    <p>Student Name: {studentInfo[0].stdname}</p>
                    <p>Student Id: {studentInfo[0].stdid}</p>
                </div>
                {rubrics.map(value => 
                    <div class="question">
                        <label>{value.label}</label>
                        <label>placeholder for description</label>
                        <div class="question-radioBox">
                            {value.values.map(mark => mark.label !== "" ?
                            <span>
                                <input type="radio" name={mark} value={mark.label} />
                                <label>{mark.label}</label>
                               </span> : <span></span>
                            )}
                            <div class="grade-other">
                                <label>other</label>
                                <input class="question-numberinput" type="text" name={value.title} placeholder="other"/>
                            </div>
                        </div>
                        <div class="question-radioBox">
                            {value.values.map(mark => mark.value !== "" ?
                                <span>
                                    <input type="radio" name={mark} value={mark.value} />
                                    <label>{mark.value}</label>
                                </span> : <span></span>
                                                    )}
                                    <textarea type="text" name={value.title} placeholder="other" />
                        </div>

                    </div> )}
                    <div class="btn-block">
                        <button class="question-buttons" type="button" href="/"><Link to="/grading/menuN" class="button-link" type="botton">Commit Change</Link></button>
                        <button class="question-buttons" type="button" onClick={showPopup}>Check</button>
                    </div>

            </div>
        </div>
    )
};