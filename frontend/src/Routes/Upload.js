import React, {useState, useEffect} from "react";

import {Link} from "react-router-dom";

import Papa from "papaparse";
import axios from "axios";

export default function Upload() {
    const API = "http://localhost:5000";
    const [rubricFile, setRubricFile] = useState(null);
    const [studentsFile, setStudentsFile] = useState(null);

    const onRubricFileChange = event => {
        setRubricFile( event.target.files[0] );
        //console.log(event.target.files[0]);
    };

    const onStudentsFileChange = event => {
        setStudentsFile( event.target.files[0] );
        //console.log(event.target.files[0]);
    };

    const onFilesUpload = async () => {
        
        let rubricJson;
        let studentsJson;

        const rubricReader = new FileReader();
        const studentsReader = new FileReader();

        try {
            rubricReader.readAsText(rubricFile, "UTF-8");
            studentsReader.readAsText(studentsFile, "UTF-8");
        } catch(error) {
            alert("Not all files uploaded!");
        }

        try {
            await new Promise(resolve => rubricReader.onload = () => resolve());
            rubricJson = Papa.parse(rubricReader.result, {header: true});
            axios.post(API + "/grading/uploadRubric", rubricJson.data).catch(err => console.log(err));
        } catch(error) {
            alert("Not csv format!");
        }

        try {
            await new Promise(resolve => studentsReader.onload = () => resolve());
            studentsJson = Papa.parse(studentsReader.result, {header: true});
            axios.post(API + "/grading/uploadStudents", studentsJson.data).catch(err => console.log(err));
        } catch(error) {
            alert("Not csv format!");
        }

        try {
            //console.log(rubricJson);
            //console.log(studentsJson);
            const caInfo = rubricJson.data[0];
            const caNames = caInfo.title.split(',');
            //console.log(caInfo);
            //console.log(caNames);
            axios.post(API + "/grading/uploadCourse", [{"courseId": caInfo.courseId, "courseName": caNames[0]}]).then(res => console.log(res)).catch(err => console.log(err));
            axios.post(API + "/grading/uploadAssignment", [{"courseId": caInfo.courseId, "assignmentId": caInfo.assignmentId, "assignmentName": caNames[1]}]).then(res => console.log(res)).catch(err => console.log(err));
            await axios.post(API + "/grading/uploadRubricForStudents", [rubricJson.data, studentsJson.data]).then(res => console.log(res)).catch(err => console.log(err));
        } catch(err) {
            
        }

    };
    
    return (
        <div>
            <Link to="/" class = "back">Back</Link>
            <h2 class = "front">Marking</h2>
            <div  class = "upload-page  move-left">
                <div>
                    <label class = "front1">Rubric:</label>
                    <input class = "front1" type="file" onChange={onRubricFileChange} />
                    <br/>
                </div>
                <div>
                    <label class = "front1">Students List:</label>
                    <input class = "front1" type="file" onChange={onStudentsFileChange} />
                    <br/>
                </div>
            </div>
            <div class = "upload-page">
                <div><button class = "upload-button" onClick={onFilesUpload}>Upload</button></div>
                <div><Link to="/grading/menu" type = "button" class = "upload-button">Grade Now</Link></div>
            </div>
        </div>
    )
    
};
