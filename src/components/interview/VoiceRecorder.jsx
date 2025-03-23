
import React, { useState, useEffect, useRef } from 'react';
import { convertSpeechToText } from '../../utils/speechToText';
import Progress from '../ui/Progress';

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  
  const maxRecordingTime = 120; // Maximum recording time in seconds
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          // Auto-stop if reached max recording time
          if (prev >= maxRecordingTime - 1) {
            stopRecording();
            return maxRecordingTime;
          }
          return prev + 1;
        });
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
        streamRef.current = stream;
        
        // Set up audio visualization
        setupAudioVisualization(stream);
        
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
            setProcessingStatus('Converting speech to text...');
            const { text, sentiment } = await convertSpeechToText(audioBlob);
            setTranscript(text);
            setProcessingStatus('Analyzing response sentiment...');
            
            // Short delay to allow user to see the processing status
            setTimeout(() => {
              onRecordingComplete(text, sentiment);
              setProcessingStatus('');
            }, 1000);
          } catch (error) {
            console.error("Error converting speech to text:", error);
            setProcessingStatus('Error processing response. Please try again.');
          }
          
          // Clean up the stream tracks
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
          
          // Clean up audio context
          if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
          }
        };

        recorder.start();
        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setProcessingStatus('Error accessing microphone. Please check your permissions.');
      }
    };

    startRecording();

    return () => {
      if (recorder && recorder.state === 'recording') {
        recorder.stop();
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [onRecordingComplete]);

  const setupAudioVisualization = (stream) => {
    try {
      // Create audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      // Connect the microphone stream to the analyser
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      // Start the visualization loop
      visualizeAudio();
    } catch (error) {
      console.error("Error setting up audio visualization:", error);
    }
  };

  const visualizeAudio = () => {
    if (!analyserRef.current || !isRecording) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average level
    const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
    const normalized = Math.min(100, (average / 128) * 100); // Normalize to 0-100 range
    
    setAudioLevel(normalized);
    
    // Continue the loop
    if (isRecording) {
      requestAnimationFrame(visualizeAudio);
    }
  };

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
  
  // Calculate progress percentage
  const progressPercentage = (recordingTime / maxRecordingTime) * 100;

  return (
    <div className="flex flex-col items-center p-6 rounded-lg bg-white/30 dark:bg-black/30 shadow-sm">
      {isRecording ? (
        <>
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full bg-red-100 flex items-center justify-center">
              <div 
                className={`w-14 h-14 rounded-full bg-red-500 ${isRecording ? 'animate-pulse-soft' : ''}`}
                style={{
                  transform: `scale(${0.8 + (audioLevel / 300)})`,
                  transition: 'transform 0.1s ease-in-out'
                }}
              ></div>
            </div>
            {/* Audio level indicator rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-full h-full rounded-full border-4 border-red-300 opacity-30"
                style={{
                  transform: `scale(${1 + (audioLevel / 200)})`,
                  transition: 'transform 0.2s ease-out'
                }}
              ></div>
            </div>
            {audioLevel > 40 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-full h-full rounded-full border-4 border-red-200 opacity-20"
                  style={{
                    transform: `scale(${1.1 + (audioLevel / 150)})`,
                    transition: 'transform 0.3s ease-out'
                  }}
                ></div>
              </div>
            )}
          </div>
          
          <div className="text-xl font-semibold mb-2">
            {formatTime(recordingTime)}
          </div>
          
          <div className="w-full max-w-xs mb-4">
            <Progress value={progressPercentage} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Recording</span>
              <span>{formatTime(maxRecordingTime - recordingTime)} remaining</span>
            </div>
          </div>
          
          <div className="text-center max-w-md mb-4">
            <p className="text-sm text-muted-foreground">
              Speak clearly into your microphone. Answer the question thoroughly and confidently.
            </p>
          </div>
          
          <button
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full transition-colors flex items-center"
            onClick={stopRecording}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            </svg>
            Stop Recording
          </button>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          </div>
          
          <div className="text-lg font-medium mb-2">
            Processing Your Answer
          </div>
          
          <div className="text-center max-w-md mb-6">
            <p className="text-sm text-muted-foreground">
              {processingStatus || "Analyzing your response..."}
            </p>
          </div>
          
          {!transcript && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
            </div>
          )}
          
          {transcript && (
            <div className="w-full p-4 bg-white/50 dark:bg-black/20 rounded-lg mt-2">
              <p className="text-sm italic">{transcript}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VoiceRecorder;
