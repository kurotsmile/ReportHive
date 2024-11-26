import { useState } from 'react';

export default function UploadButton() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/excel/import', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setResponse(data);
    };

    return (
        <div>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {response && (
                <pre>{JSON.stringify(response, null, 2)}</pre>
            )}
        </div>
    );
}
