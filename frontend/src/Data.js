// === Node Packages === 
import { useRef, useEffect } from "react";

function Data({ setRows, statements, setStatements }) {
    // Create reference for file input
    const file_input_ref = useRef(null);

    function submitFiles() {
        // Fire click event on file input
        file_input_ref.current.click();
    }

    async function handleFiles(event) {
        // If files don't exist, then exit
        if (!event.target.files) return; 

        // Reset statements 
        if (statements.length > 0) setStatements([]);

        // Parse JSON file data
        const files = event.target.files;
        let _statements = [];
        for (const file of files) {
            let statement = {
                name: file.name,
                data: await JSON.parse(await file.text()).data,
            };
            _statements.push(statement);
        }

        // Set statements
        setStatements(_statements);
    }

    async function resetFiles() {
        // Reset Statements and TableRows
        setStatements([]);
        setRows([]);

        // Show Upload button; Hide Close button and File Container
        const file_upload_button = document.querySelector(".file-upload-button");
        file_upload_button.classList.toggle("hidden");
        const file_close_button = document.querySelector(".file-close-button");
        file_close_button.classList.toggle("hidden");
        const file_container = document.querySelector(".file-container");
        file_container.classList.toggle("hidden");
        
        // Remove all files in File Container
        while (file_container.firstChild) {
            file_container.removeChild(file_container.firstChild);
        }
    }

    useEffect(() => {
        if (statements.length > 0) {
            // Hide Upload button; Show Close button and File Container
            const file_upload_button = document.querySelector(".file-upload-button");
            file_upload_button.classList.toggle("hidden");
            const file_close_button = document.querySelector(".file-close-button");
            file_close_button.classList.toggle("hidden");
            const file_container = document.querySelector(".file-container");
            file_container.classList.toggle("hidden");

            // Populate File Container with File nodes
            for (const statement of statements) {
                const file = document.createElement("p");
                file.classList.add("file")
                file.innerHTML = statement.name;
                file_container.appendChild(file);
            }
        }
    }, [statements]);

    return (
        <div className="data-container pink shadow border">
            <div className="data-header">
                <h2 className="section-heading">
                    Data
                </h2>
                <button className="file-close-button hidden" onClick={resetFiles} >
                    X
                </button>
            </div>
            <input 
                className="hidden" 
                type="file" 
                accept=".csv, .json" 
                onChange={handleFiles} 
                ref={file_input_ref}
                multiple
            />
            <div className="file-button-container">
                <button className="file-upload-button" onClick={submitFiles} >
                    UPLOAD
                </button>
            </div>
            <div className="file-container hidden">
                {/* Files go here */}
            </div>
        </div>
    );
}

export default Data;

