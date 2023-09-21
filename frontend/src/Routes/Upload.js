import React, {useState} from "react";
import Papa from "papaparse";
import axios from "axios";
import { saveAs } from "file-saver";
import './Routes.css';

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
                rubricJson = JSON.parse(e.target.result)
                console.log(rubricJson);
                // axios.post()

                //const file = axios.get(API+"/rubric/jsonDownloadTest", {data : {"rubric":rubricJson}}).then(res => res.data);
                //const file = new Blob([JSON.stringify(rubricJson)], { type: "application/json" });
                //console.log(file);
                //saveAs(file, "test.json");
            } catch(error) {
                alert("Not json format!");
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
            <h2>Marking</h2>
            <div>
                <label>Rubric:</label>
                <input type="file" onChange={onRubricFileChange} />
                <br/>
                <label>Students List</label>
                <input type="file" onChange={onStudentsFileChange} />
                <br/>
                <button onClick={onFilesUpload}>Upload</button>
            </div>
        </div>
    )
    
};
