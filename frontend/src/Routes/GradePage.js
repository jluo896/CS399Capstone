import React from "react";

import {Link} from "react-router-dom";

export default function GradePage() {
    // grading functions
    const rubrics = [
        {
            "title": "question 1",
            "description": "this is a description",
            "marks": [0,1,2, "", ""],
            "comments": ["bad","good"]
        },
        {
            "title": "question 2",
            "description": "this is another description",
            "marks": [0,1,2,3],
            "comments": ["bad","good"]
        },
    ]

    const students = [
        {
            "studentId": 1,
            "studentUpi": "tuse123",
            "studentName": "test user",
        },
    ]

    return (
        //grading forms
        <div>
            <Link to="/">Home</Link>
            <Link to="/grading/menu">Back</Link>
            {rubrics.map(value => 
            <div>
                <label>{value.title}</label>
                <p>{value.description}</p>
                {value.marks.map(mark=> mark !== "" ?
                <span>
                    <input type="radio" name={value.title} value={mark} />
                    <label>{mark}</label>
                </span> : <span></span>)}
                <input type="radio" name={value.title} value="other" />
                <input type="text" name={value.title} />
                <br/>
                {value.comments.map(mark=>
                <span>
                    <input type="radio" name={value.title} value={mark} />
                    <label>{mark}</label>
                </span>)}
                <input type="radio" name={value.title} value="other" />
                <input type="text" name={value.title} />
            </div>)}
            <p>{test[0].title}</p>
        </div>
    )
};