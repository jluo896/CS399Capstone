import React, { useState } from "react";
import './GradePage1.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rubric from "./Rubric";
import axios from "axios";

export default function GradePage1() {
    function parseComments(data) {
        for (let i = 0; i < data.length; i++) {
          const commentsArray = data[i].comments.split(",");
          const cleanedComments = commentsArray.map(comment => comment.trim());
          const marksArray = data[i].marks.split(",");
          const cleanedMarks = marksArray.map(comment => comment.trim());
          data[i].comments = cleanedComments;
          data[i].marks = cleanedMarks;
        }
        
        return data;
      }
    const imprtInfo = [{"courseId":1,"assignmentId":1,"questionId":0,"title":"Test Course,Test Assignment 1","marks":"10","comments":""}
    ,	
    {	"courseId":1,
        "assignmentId":1,
        "questionId":1,
        "title":"Question 1",
        "marks":"0,1,2",
        "comments":"comment 1,comment 2,comment 3,comment 4"},
    
        {"courseId":1,
        "assignmentId":1,
        "questionId":2,
        "title":"Question 2","marks":"0,2,4,7","comments":"comment 1,commen2"},{"courseId":1,"assignmentId":1,"questionId":3,"title":"Question 3","marks":"0,1","comments":"No name,Name"}
    ];
    const updatedImprtInfo = parseComments(imprtInfo);
    const firstElement = updatedImprtInfo.shift();
    
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

    //Params
    const { stdId } = useParams();
    const { rbkId } = useParams();

    const showPopup = () => {
        alert("Everything is filled.");
    };

    return (
        //grading forms
        <div>
            <Link to="/" className="back">Back</Link>
            <div className="blank-container">
                {
                    <div class="grade-header">
                        <div class="grade-title">
                            <p>{firstElement.title} rubric {rbkId}</p>
                        </div>
                        <div class="grade-details">
                            <p>Student Name: {studentInfo[0].stdname}</p>
                            <p>Student Id: {stdId}</p>
                        </div>
                    </div>}
                <div>
                    <ul>
                        {updatedImprtInfo.map( value=>
                            <div className="question" key={value.label}>
                                <label>{value.title}</label>
                                <label>comment</label>
                                <div>
                                    {value.marks.map(mark =>
                                        mark !== "" ?
                                            <span key={mark.label}>
                                                <input
                                                    className="question-radio"
                                                    type="radio"
                                                    name={value.title}
                                                    value={mark}
                                                    checked={formData[value.title]?.mark === mark}
                                                    onChange={() => handleInputChange(value.title, 'mark', mark)}
                                                />
                                                <label>{mark}</label>
                                            </span>
                                            : null
                                    )}
                                    <input
                                        className="question-numberinput"
                                        type="text"
                                        name={value.title}
                                        placeholder={'Other'}
                                        value={formData[value.title]?.mark || ''}
                                        onChange={(e) => handleInputChange(value.title, 'mark', e.target.value)}
                                    />
                                    <br />
                                </div>
                                {value.comments.map(comment =>
                                    comment !== "" ?
                                        <span key={comment}>
                                            <div className="question-comments">
                                                <input
                                                    type="radio"
                                                    name={value.title+' comment'}
                                                    value={comment.name}
                                                    checked={formData[value.title]?.comment === comment}
                                                    onChange={() => handleInputChange(value.title, 'comment', comment)}
                                                />
                                                <label>{comment}</label>
                                            </div>
                                        </span>
                                        : null
                                )}
                                { <textarea
                                    type="text"
                                    name={value.title+' comment'}
                                    placeholder={'Other'}
                                    value={formData[value.title]?.comment || ''}
                                    onChange={(e) => handleInputChange(value.title, 'comment', e.target.value)}
                                /> }
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