import React, {useState} from "react";

import {Link} from "react-router-dom";

import Papa from "papaparse";
import axios from "axios";
import { saveAs } from "file-saver";


/**
 * Multiple file upload: https://codefrontend.com/file-upload-reactjs/
 */

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

    const onFilesUpload = () => {
        
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

        rubricReader.onload = e => {
            try {
                studentsJson = Papa.parse(e.target.result, {header: true});
                console.log(studentsJson.data);
                // axios.post()

                //const file = axios.get(API+"/rubric/jsonDownloadTest", {data : {"rubric":rubricJson}}).then(res => res.data);
                //const file = new Blob([JSON.stringify(rubricJson)], { type: "application/json" });
                //console.log(file);
                //saveAs(file, "test.json");
            } catch(error) {
                alert("Not csv format!");
            }
        }

        studentsReader.onload = e => {
            try {
                studentsJson = Papa.parse(e.target.result, {header: true});
                console.log(studentsJson.data);
                // axios.post()
            } catch(error) {
                alert("Not csv format!");
            }
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
