import React, {useState} from "react";
import axios from "axios";

export default function Marking() {
    const [rubricFile, setRubricFile] = useState(null);
    const [studentsFile, setStudentsFile] = useState(null);

    const onRubricFileChange = event => {
        setRubricFile( event.target.files[0] );
        console.log(event.target.files[0]);
    };

    const onStudentsFileChange = event => {
        setStudentsFile( event.target.files[0] );
        console.log(event.target.files[0]);
    };

    const onFilesUpload = () => {
        const rubricFormData = new FormData();
        const studentsFormData = new FormData();

        rubricFormData.append("rubric", rubricFile)
        studentsFormData.append("rubric", studentsFile)

        console.log(rubricFile)
        console.log(studentsFile)
        console.log(rubricFormData)
        console.log(studentsFormData)
        // axios.post()
        // axios.post()
    };
    
    return (
        <div>
            <h1>marking</h1>
            <div>
                <label>Rubric</label>
                <input type="file" onChange={onRubricFileChange} />
                <label>Students List</label>
                <input type="file" onChange={onStudentsFileChange} />
                <button onClick={onFilesUpload}>Upload</button>
            </div>
        </div>
    )
    
};
