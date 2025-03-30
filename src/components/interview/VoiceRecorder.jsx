
import React, { useState, useEffect, useRef } from 'react';
import { convertSpeechToText } from '../../utils/speechToText';
import { toast } from 'sonner';
import AudioVisualizer from './AudioVisualizer';
import RecordingTimer from './RecordingTimer';

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [silenceDetected, setSilenceDetected] = useState(false);
  const [speechDetected, setSpeechDetected] = useState(false);
  
  const maxRecordingTime = 120; // Maximum recording time in seconds
  const silenceThreshold = 5; // Seconds without speech to trigger warning
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const silenceCountRef = useRef(0);

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
    if (isRecording) {
      // Reset silence timer when recording starts
      silenceTimerRef.current = setInterval(() => {
        // If audio level is very low for a period (likely silence)
        if (audioLevel < 10) {
          silenceCountRef.current += 1;
          
          // If silence for 5 seconds and speech was detected before
          if (silenceCountRef.current >= silenceThreshold && speechDetected) {
            setSilenceDetected(true);
            toast.warning("No voice detected. Please continue speaking.");
          }
        } else {
          // Reset silence counter when audio is detected
          silenceCountRef.current = 0;
          setSilenceDetected(false);
          setSpeechDetected(true);
        }
      }, 1000);
    }

    return () => {
      if (silenceTimerRef.current) {
        clearInterval(silenceTimerRef.current);
      }
    };
  }, [isRecording, audioLevel, speechDetected]);

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
            
            // Validate answer length
            if (validateAnswerLength(text)) {
              // Short delay to allow user to see the processing status
              setTimeout(() => {
                onRecordingComplete(text, sentiment);
                setProcessingStatus('');
              }, 1000);
            } else {
              // Answer is too short, prompt user to try again
              toast.error("Your answer seems too short. Please elaborate and try again.");
              setProcessingStatus('');
              // Reset for re-recording
              setIsRecording(true);
              chunks = [];
              setAudioChunks([]);
              setTranscript('');
              startRecording();
              return;
            }
          } catch (error) {
            console.error("Error converting speech to text:", error);
            setProcessingStatus('Error processing response. Please try again.');
            toast.error("Failed to process your answer. Please try again.");
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
        toast.error("Could not access your microphone. Please check your permissions.");
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

      if (silenceTimerRef.current) {
        clearInterval(silenceTimerRef.current);
      }
    };
  }, [onRecordingComplete]);

  const validateAnswerLength = (text) => {
    if (!text) return false;
    
    // Count words by splitting on whitespace
    const words = text.trim().split(/\s+/);
    return words.length >= 5; // Minimum 5 words
  };

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

  // Render components based on recording state
  if (isRecording) {
    return (
      <div className="flex flex-col items-center p-6 rounded-lg bg-white/30 dark:bg-black/30 shadow-sm">
        <AudioVisualizer audioLevel={audioLevel} />
        
        <RecordingTimer recordingTime={recordingTime} maxRecordingTime={maxRecordingTime} />
        
        <div className="text-center max-w-md mb-4">
          <p className="text-sm text-muted-foreground">
            Speak clearly into your microphone. Answer the question thoroughly and confidently.
          </p>
          {silenceDetected && (
            <p className="text-amber-500 text-sm mt-2 animate-pulse">
              No voice detected. Please continue speaking.
            </p>
          )}
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
      </div>
    );
  }
  
  // Processing state
  return (
    <div className="flex flex-col items-center p-6 rounded-lg bg-white/30 dark:bg-black/30 shadow-sm">
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
    </div>
  );
};

export default VoiceRecorder;
