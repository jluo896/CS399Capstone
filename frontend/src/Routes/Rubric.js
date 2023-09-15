import { saveAs } from "file-saver";
import $ from "jquery";
import React, {Component, createRef} from "react";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

class Rubric extends Component {
    fb = createRef();
    componentDidMount() {
        $(this.fb.current).formBuilder();
    }

    state = {selectedFile: null}

    onFileChange = (event) => {
        this.setState({selectedFile: event.target.files[0] })
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

                for (let i = 0; i < rubricBaseJson.length; i=i+4) {
                    rubricNewRubric.push({
                        "Title": rubricBaseJson[i].label,
                        "Description": rubricBaseJson[i+1].label,
                        "Marks": [rubricBaseJson[i+2].values[0].label, rubricBaseJson[i+2].values[1].label],
                        "Comments": rubricBaseJson[i+3].label,
                    });
                }

                console.log(rubricBaseJson);
                console.log(rubricNewRubric);

                const file = new Blob([JSON.stringify(rubricNewRubric)],{ type: "application/json" });
                saveAs(file, "test.json");
            } catch(error) {
                alert("Not json format!");
            }
        }
    }

    render() {
        return (
            <div>
                <h2>Marking</h2>
                <p>We will use this form builder which we definitly not steal from the internet. Here is what you're suppose to do to create the appropriate rubric format for each question/section. </p>
                <ul>
                    <li>Header - Question/Section Title</li>
                    <li>Paragraph - Question/Section</li>
                    <li>Radio - Preset Marks for Question/Section</li>
                    <li>Select - Preset Comments</li>
                </ul>
                <div id="fb-editor" ref={this.fb}></div>
                <p>Copy the json from the form builder and create a new json file, then upload that json file into the form below. It would dowbnload a rubric in json (plan to do csv as well) to the apprioriate format.</p>
                <label>Json Convertor and Download:</label>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.convertAndDownload}>Upload</button>
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