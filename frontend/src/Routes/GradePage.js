import React from "react";
import './GradePage1.css';
import { Link } from "react-router-dom";
import Rubric from "./Rubric";

export default function GradePageN() {
    // grading functions
    const rubrics = [
        {
            "title": "question 1",
            "description": "this is a description",
            "marks": [0, 1, 2, "", ""],
            "comments": ["bad", "good"]
        },
        {
            "title": "question 2",
            "description": "this is another description",
            "marks": [0, 1, 2, 3],
            "comments": ["real reaaal reeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaally long txt.", "good"]
        },
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
            <Link to="/" class= "back">Back</Link>
            <div class="blank-container">
                {
                    <div class="grade-header">
                        <div class="grade-title">
                            <p>Course Code: {studentInfo[0].courseCode}</p>
                            <p>Assignment: {studentInfo[0].assignmenttitle}</p>
                        </div>
                        <div class="grade-details">
                            <p>Student Name: {studentInfo[0].stdname}</p>
                            <p>Student Id: {studentInfo[0].stdid}</p>
                        </div>
                    </div>}
                <div>
                    <ul>
                        {rubrics.map(value =>
                            <div class="question">
                                <label>{value.title}</label>
                                <p>{value.description}</p>
                                {value.marks.map(mark => mark !== "" ?
                                    <span>
                                        <input type="radio" name={value.title} value={mark} />
                                        <label>{mark}</label>
                                    </span> : <span></span>)}
                                {/*<div>*/}
                                {/*    <input type="radio" value="none" id="radio_1" name={value.title} />*/}
                                {/*</div>*/}
                                <input class="question-numberinput" type="text" name={value.title} placeholder={'Other'} />
                                <br />
                                <line></line>
                                {value.comments.map(mark =>

                                    <div>
                                        <input type="radio" name={value.title} value={mark} />
                                        <label class="radio-comments">{mark}</label>
                                    </div>
                                )}
                                <textarea type="text" name={value.title} placeholder={'Other'} />

                            </div>)}

                    </ul>
                    <div class="btn-block">
                        <button type="submit" href="/"><Link to="/grading/menuN" class="button-link" type="botton">Commit Change</Link></button>
                    </div>
                    <div class="btn-block">

                        <button type="button" onClick={showPopup}>Check</button>
                    </div>

                </div>
            </div>
        </div>
    )
};