import { useState } from 'react';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/excel/import', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to upload file");
            }

            const data = await res.json();
            setResponse(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Upload Excel File</h1>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
            <button 
                onClick={handleUpload}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Upload
            </button>
            {error && (
                <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
            )}
            {response && (
                <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                    <h2>Uploaded Data:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
