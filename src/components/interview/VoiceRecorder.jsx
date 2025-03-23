
import React, { useState, useEffect } from 'react';
import { convertSpeechToText } from '../../utils/speechToText';

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    let recorder;
    let chunks = [];

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
            setAudioChunks([...chunks]);
          }
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          try {
            const { text, sentiment } = await convertSpeechToText(audioBlob);
            setTranscript(text);
            onRecordingComplete(text, sentiment);
          } catch (error) {
            console.error("Error converting speech to text:", error);
          }
          
          // Clean up the stream tracks
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startRecording();

    return () => {
      if (recorder && recorder.state === 'recording') {
        recorder.stop();
      }
    };
  }, [onRecordingComplete]);

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg bg-white/30 dark:bg-black/30 shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <div className={`w-10 h-10 rounded-full bg-red-500 ${isRecording ? 'animate-pulse-soft' : ''}`}></div>
      </div>
      
      <div className="text-xl font-semibold mb-4">
        {formatTime(recordingTime)}
      </div>
      
      <div className="text-center max-w-md mb-4">
        <p className="text-sm text-muted-foreground">
          {isRecording 
            ? "Speak clearly into your microphone. Click stop when you're finished answering."
            : "Processing your answer..."}
        </p>
      </div>
      
      {isRecording && (
        <button
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full transition-colors"
          onClick={stopRecording}
        >
          Stop Recording
        </button>
      )}
      
      {!isRecording && !transcript && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
