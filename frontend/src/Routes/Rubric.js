import React, { Component, createRef } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import $ from "jquery";

import {Link} from "react-router-dom";


window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

class Rubric extends Component {
    fb = createRef();
    componentDidMount() {
        $(this.fb.current).formBuilder();
    }

    state = {
        selectedFile: null, 
        courseId: 0, 
        courseName: "", 
        assignmentId: 0,
        assignmentName: ""
    }

    onFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0], 
            courseId: this.state.courseId, 
            courseName: this.state.courseName,
            assignmentId: this.state.assignmentId,
            assignmentName: this.state.assignmentName
        })
    };

    onCourseIdChange = (event) => {
        this.setState({
            selectedFile: this.state.selectedFile, 
            courseId: event.target.value, 
            courseName: this.state.courseName,
            assignmentId: this.state.assignmentId,
            assignmentName: this.state.assignmentName
        })
    };

    onCourseNameChange = (event) => {
        this.setState({
            selectedFile: this.state.selectedFile, 
            courseId: this.state.courseId, 
            courseName: event.target.value,
            assignmentId: this.state.assignmentId,
            assignmentName: this.state.assignmentName
        })
    };

    onAssignmentIdChange = (event) => {
        this.setState({
            selectedFile: this.state.selectedFile, 
            courseId: event.target.value, 
            courseName: this.state.courseName,
            assignmentId: event.target.value,
            assignmentName: this.state.assignmentName
        })
    };

    onAssignmentNameChange = (event) => {
        this.setState({
            selectedFile: this.state.selectedFile, 
            courseId: this.state.courseId, 
            courseName: this.state.courseName,
            assignmentId: this.state.assignmentId,
            assignmentName: event.target.value
        })
    };

    convertAndDownload = () => {
        let rubricBaseJson;

        const jsonReader = new FileReader();

        try {
            jsonReader.readAsText(this.state.selectedFile, "UTF-8");
        } catch(error) {
            alert("No file uploaded!");
        }

        jsonReader.onload = e => {
            try {
                rubricBaseJson = JSON.parse(e.target.result)

                let rubricNewRubric = [];
                let marksList = []

                for (let i = 0; i < rubricBaseJson.length; i=i+4) {
                    if (
                        rubricBaseJson[i].type !== "header" || 
                        rubricBaseJson[i+1].type !== "paragraph" || 
                        rubricBaseJson[i+2].type !== "radio-group" || 
                        rubricBaseJson[i+3].type !== "select")
                        {
                            throw "error";
                    }
                    let totalMarkList = rubricBaseJson[i+2].values.map(value => Number(value.label));
                    marksList.push(totalMarkList.reduce((a,b)=>Math.max(a,b)));
                    rubricNewRubric.push({
                        "Course Id": this.state.courseId,
                        "Title": rubricBaseJson[i].label,
                        "Description": rubricBaseJson[i+1].label,
                        "Marks": rubricBaseJson[i+2].values.map(value => value.label),
                        "Comments": rubricBaseJson[i+3].values.map(value => value.label),
                    });
                }

                let totalMark = 0;
                for (let i=0;i<marksList.length;i++) {totalMark+=marksList[i]}
                //console.log(totalMark)

                rubricNewRubric.unshift({
                    "Course Id": this.state.courseId,
                    "Title": this.state.courseName,
                    "Description": this.state.assignmentName,
                    "Marks": [totalMark],
                    "Comments": [],
                });

                //console.log(rubricBaseJson);
                console.log(rubricNewRubric);

                const file = new Blob([Papa.unparse(rubricNewRubric)],{ type: "text/csv" });
                saveAs(file, "["+this.state.courseId+"]"+this.state.assignmentName+".csv");
            } catch(error) {
                alert("Not json format!");
            }
        }
    }

    render() {
        return (
            <div>
                <h2 class = "front">Marking</h2>
                <p class = "front1">We will use this form builder which we definitly not steal from the internet. Here is what you're suppose to do to create the appropriate rubric format for each question/section. </p>
                <ul>
                    <li class = "front1">Header - Question/Section Title</li>
                    <li class = "front1">Paragraph - Question/Section</li>
                    <li class = "front1">Radio - Preset Marks for Question/Section</li>
                    <li class = "front1">Select - Preset Comments</li>
                </ul>
                <div id="fb-editor" ref={this.fb}></div>
                <p class = "front1">Copy the json from the form builder and create a new json file, then upload that json file into the form below. It would dowbnload a rubric in json (plan to do csv as well) to the apprioriate format.</p>
                <label class = "front1">Json Convertor and Download:</label>
                <input type="file" onChange={this.onFileChange} />
                <br/>
                <label>Course Id:</label>
                <input onChange={this.onCourseIdChange} />
                <label>Course Name:</label>
                <input onChange={this.onCourseNameChange} />
                <label>Assignment Name:</label>
                <input onChange={this.onAssignmentNameChange} />
                <br/>
                <button onClick={this.convertAndDownload}>Download</button>
            </div>
        )
    }
};

export default Rubric;

/*
export default function Rubric() {
    com
    return (
        <div>
            <p>rubric</p>
        </div>
    )
};
*/