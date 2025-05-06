import React, { useRef, useState } from 'react';

export default function TrainingPage() {
    const fileInputRef = useRef();
    const [fileNames, setFileNames] = useState([]);

    const handleDropzoneClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFileNames(files.map(f => f.name));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setFileNames(files.map(f => f.name));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            modelType: e.target.modelType.value,
            epochs: e.target.epochs.value,
            batchSize: e.target.batchSize.value,
            resolution: e.target.resolution.value
        };
        console.log('Training configuration:', formData);
        alert('Training initialization coming soon!');
    };

    return (
        <div className="training-container">
            <div className="logo-container">
                <img
                    className="logo"
                    src="/static/images/logotransparent.png"
                    alt="ClothMe! logo"
                    width="150"
                    height="50"
                />
            </div>

            <div className="training-header">
                <h1>Custom Model Training</h1>
                <p>Train your virtual try-on model with your brand's unique style and clothing items</p>
            </div>

            <form onSubmit={handleSubmit} id="trainingForm">
                <div className="upload-section">
                    <h3>Upload Your Dataset</h3>
                    <div
                        className="dropzone"
                        id="dropzone"
                        onClick={handleDropzoneClick}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {fileNames.length > 0 ? (
                            <p>Selected files: {fileNames.join(', ')}</p>
                        ) : (
                            <p>Drag and drop your clothing images here, or click to select files</p>
                        )}
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className="training-options">
                    <div className="option-card">
                        <h4>Model Configuration</h4>
                        <div className="input-group">
                            <label htmlFor="modelType">Base Model</label>
                            <select id="modelType" name="modelType">
                                <option value="standard">Standard Try-On</option>
                                <option value="premium">Premium Try-On</option>
                                <option value="enterprise">Enterprise Try-On</option>
                            </select>
                        </div>
                    </div>

                    <div className="option-card">
                        <h4>Training Parameters</h4>
                        <div className="input-group">
                            <label htmlFor="epochs">Training Epochs</label>
                            <input type="number" id="epochs" name="epochs" defaultValue="100" min="1" max="1000" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="batchSize">Batch Size</label>
                            <input type="number" id="batchSize" name="batchSize" defaultValue="32" min="1" max="128" />
                        </div>
                    </div>

                    <div className="option-card">
                        <h4>Optimization</h4>
                        <div className="input-group">
                            <label htmlFor="resolution">Output Resolution</label>
                            <select id="resolution" name="resolution">
                                <option value="512">512x512</option>
                                <option value="1024">1024x1024</option>
                                <option value="2048">2048x2048</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="start-training-btn">Start Training</button>
            </form>

            <div className="wave-decoration"></div>

            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                :root {
                    --primary-color: #FFECE5;
                    --text-color: #4A4A4A;
                    --accent-color: #FF69B4;
                }

                body {
                    min-height: 100vh;
                    background-color: var(--primary-color);
                    background-image: linear-gradient(135deg, #FFECE5 0%, #FFE2D9 100%);
                    padding: 2rem;
                }

                .training-container {
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.15);
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 3rem;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .logo {
                    width: 150px;
                    height: auto;
                }

                .training-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .training-header h1 {
                    color: var(--text-color);
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .training-header p {
                    color: var(--text-color);
                    font-size: 1.1rem;
                    opacity: 0.8;
                }

                .upload-section {
                    background: #fff;
                    border-radius: 15px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    border: 2px dashed var(--accent-color);
                }

                .upload-section h3 {
                    color: var(--text-color);
                    margin-bottom: 1rem;
                }

                .dropzone {
                    padding: 2rem;
                    text-align: center;
                    background: #fafafa;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .dropzone:hover {
                    background: #f0f0f0;
                }

                .training-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .option-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                }

                .option-card h4 {
                    color: var(--accent-color);
                    margin-bottom: 1rem;
                }

                .option-card label {
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .option-card select,
                .option-card input {
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #eee;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                }

                .start-training-btn {
                    background-color: var(--accent-color);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    padding: 1rem 2rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                    margin-top: 1rem;
                }

                .start-training-btn:hover {
                    background-color: #ff4da6;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
                }

                .wave-decoration {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 150px;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23FF69B4' fill-opacity='0.2' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
                    background-size: cover;
                    pointer-events: none;
                }

                @media (max-width: 768px) {
                    .training-container {
                        padding: 1.5rem;
                    }

                    .training-header h1 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
