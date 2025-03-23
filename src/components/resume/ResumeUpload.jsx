
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import { parseResume } from '../../utils/resumeParser';

const ResumeUpload = ({ onResumeProcessed, setLoading }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setFile(file);
    } else {
      alert("Please upload a PDF or Word document");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setLoading(true);
      const parsedData = await parseResume(file);
      onResumeProcessed(parsedData);
    } catch (error) {
      console.error("Error processing resume:", error);
      alert("Failed to process resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>
          Upload your resume to get started with your interview preparation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`relative rounded-lg border-2 border-dashed transition-colors p-8 text-center ${
            dragActive 
              ? "border-primary bg-primary/5" 
              : file 
                ? "border-green-500 bg-green-50" 
                : "border-gray-300 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />

          {file ? (
            <div className="py-4 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="text-sm font-medium">{file.name}</span>
              <button 
                className="text-xs text-red-500 mt-2"
                onClick={() => setFile(null)}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-2">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m16 16-4-4-4 4"></path>
              </svg>
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop your resume here, or
              </p>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none"
                onClick={() => inputRef.current?.click()}
              >
                browse files
              </button>
              <p className="text-xs text-muted-foreground mt-2">
                Supports PDF, DOC, DOCX
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={handleUpload}
          disabled={!file}
        >
          Analyze Resume
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResumeUpload;
