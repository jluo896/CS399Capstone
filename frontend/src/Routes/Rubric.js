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

                for (let i = 0; i < rubricBaseJson.length; i++) {
                    if (
                        rubricBaseJson[i].type !== "radio-group" && 
                        rubricBaseJson[i].type !== "select")
                        {
                            throw "error";
                    }
                    let totalMarkList = rubricBaseJson[i].values.map(value => Number(value.label));
                    marksList.push(totalMarkList.reduce((a,b)=>Math.max(a,b)));
                    rubricNewRubric.push({
                        "Course Id": this.state.courseId,
                        "Assignment Id": this.state.assignmentId,
                        "Title": rubricBaseJson[i].label,
                        "Marks": rubricBaseJson[i].values.map(value => value.label).filter(function(label) {if (label !== "") return label}),
                        "Comments": rubricBaseJson[i].values.map(value => value.value).filter(function(value) {if (value !== "") return value}),
                    });
                }

                let totalMark = 0;
                for (let i=0;i<marksList.length;i++) {totalMark+=marksList[i]}
                //console.log(totalMark)

                rubricNewRubric.unshift({
                    "Course Id": this.state.courseId,
                    "Assignment Id": this.state.assignmentId,
                    "Title": this.state.assignmentName,
                    "Marks": [totalMark],
                    "Comments": [],
                });

                /*

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
                */
                
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
                <Link to="/" class = "back">Back</Link>
                <h2 class = "front">Marking</h2>
                <p class = "front1">We will use this form builder which we definitely not steal from the internet. Here is what you're suppose to do to create the appropriate rubric format for each question/section. </p>
                <ul>
                    <li class = "front1">Insert course id, assignment id, course name, and assignment name.</li>
                    <li class = "front1">Insert either Radio Group or Select for each question/section in the form builder using drag and drop.</li>
                    <li class = "front1">Editing each question/section:</li>
                    <ul>
                        <li class = "front1">Label: The question or section title</li>
                        <li class = "front1">Options - Left column: Marks</li>
                        <li class = "front1">Options - RIght column: Comment</li>
                        <li class="front1">Note that the number of marks and comments don't have to be the same.</li>
                    </ul>
                </ul>
                <label class = "front1">Course Id:</label>
                <input onChange={this.onCourseIdChange} />
                <label class = "front1">Assignment Id:</label>
                <input onChange={this.onAssignmentIdChange} />
                <label class = "front1">Course Name:</label>
                <input onChange={this.onCourseNameChange} />
                <label class = "front1">Assignment Name:</label>
                <input onChange={this.onAssignmentNameChange} />
                <br/>
                <div id="fb-editor" ref={this.fb}></div>
                <p class = "front1">Copy the json from the form builder and create a new text file, then upload that json file into the form below. It would dowbnload a rubric as a csv to the appropriate, simplified format.</p>
                <label class = "front1">Json Convertor and Download:</label>
                <input class = "front1" type="file" onChange={this.onFileChange} />
                <br/>
                <button type="button" class = "button" onClick={this.convertAndDownload}>Download</button>
                <button onClick={null}>Upload Rubric</button>
            </div>
        )
    }
};

export default Rubric;
