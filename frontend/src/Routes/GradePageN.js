import React, { useEffect, useState } from "react";
import './GradePage1.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rubric from "./Rubric";
import Axios from 'axios'; // Import Axios

export default function GradePageN() {
    //Params
    const { stdId } = useParams();
    const { rbkId } = useParams();
    const [imprtInfo2, setImprtInfoFromAPI] = useState([]); // State to store data from the API
    

    useEffect(() => {
        // Fetch data from the API
        Axios.get('http://localhost:5000/grading/rubrics/'+rbkId)
            .then(response => {
                // Assuming the API response is an array of objects similar to imprtInfo2
                const formattedData = response.data.map(item => ({
                    courseId: item.courseId,
                    assignmentId: item.assignmentId,
                    questionId: item.questionId,
                    title: item.title,
                    marks: item.marks.split(",").map(mark => mark.trim()),
                    comments: item.comments.split(",").map(comment => comment.trim())
                }));
                // Set the formatted data in state

                setImprtInfoFromAPI(formattedData);
            })
            .catch(error => {
                console.error("Error fetching data from the API:", error);
            });
    }, []);
    
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
    };

    const handleCommitButtonClick = () => {
        const assignmentId = studentInfo[0].assignmentId;
        const dataWithAssignmentId = {
            [assignmentId]: formData
        }
        console.log('Output:', JSON.stringify(dataWithAssignmentId));
        
    };

    // grading functions

    const showPopup = () => {
        alert("Everything is filled.");
    };
    const firstElementApi = imprtInfo2.length > 0 ? imprtInfo2[0] : null;
    const ihatelife = imprtInfo2.shift();
    var firstElement = {
        "courseId": 4,
        "assignmentId": 2,
        "questionId": 9,
        "title": "Test Course,Test Assignment 2",
        "marks": [
            "10"
        ],
        "comments": [
            ""
        ]
    };
    if(firstElementApi!=null){
        firstElement = firstElementApi;
    }
    console.log('Saved Comment:', firstElementApi);
    console.log('Saved Comment:1', firstElement);
    return (
        //grading forms
        <div>
            <Link to="/" className="back">Back</Link>
            <div className="blank-container">
                {
                    <div class="grade-header">
                        <div class="grade-title">
                            <p>{firstElement.title}</p>
                        </div>
                        <div class="grade-details">
                            <p>Student Name: {rbkId}</  p>
                            <p>Student Id: {stdId}</p>
                        </div>
                    </div>}
                <div>
                    <ul>
                        {imprtInfo2.map( value=>
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