import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import { parseResume } from '../../ai-agents/resumeParser';
import { toast } from 'sonner';
import FileUploader from './FileUploader';

const ResumeUpload = ({ onResumeProcessed, setLoading }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Reset error state
  const handleFileError = (errorMessage) => {
    setFile(null);
    setError(errorMessage);
    setProcessing(false);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    
    try {
      setLoading(true);
      setProcessing(true);
      setError('');
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      console.log("Starting resume parsing...");
      const parsedData = await parseResume(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!parsedData || !parsedData.completenessScore) {
        throw new Error('Resume parsing failed. Please try again.');
      }
      
      console.log("Resume parsed successfully:", parsedData);
      onResumeProcessed(parsedData);
      toast.success('Resume analyzed successfully!');
      
    } catch (error) {
      console.error("Error processing resume:", error);
      handleFileError(error.message || "Failed to process resume. Please try again.");
    } finally {
      setProcessing(false);
      setLoading(false);
      setUploadProgress(0);
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
        <FileUploader 
          file={file}
          setFile={setFile}
          onUpload={handleUpload}
          resetError={() => setError('')}
        />
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={handleUpload}
          disabled={!file || processing}
        >
          {processing ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResumeUpload;
