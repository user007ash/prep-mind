
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import { parseResume } from '../../utils/resumeParser';
import { toast } from 'sonner';
import FileUploader from './FileUploader';

const ResumeUpload = ({ onResumeProcessed, setLoading }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please upload a resume file first');
      return;
    }
    
    try {
      setLoading(true);
      setProcessing(true);
      setError('');
      
      // Simulate upload progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);
      
      const parsedData = await parseResume(file);
      
      // Complete the progress
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Data validation
      if (!parsedData || !parsedData.completenessScore) {
        throw new Error('Resume parsing failed. Please try another file.');
      }
      
      // Check for missing elements and provide feedback
      if (parsedData.completenessScore < 75 && parsedData.missingElements && parsedData.missingElements.length > 0) {
        const missingParts = parsedData.missingElements.join(', ');
        toast.warning(`Your resume could be improved. Consider adding: ${missingParts}`);
      }
      
      // Success
      onResumeProcessed(parsedData);
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      console.error("Error processing resume:", error);
      setError(error.message || "Failed to process resume. Please try again.");
      toast.error(error.message || "Failed to process resume. Please try again.");
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
          allowedFileTypes={allowedFileTypes}
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
