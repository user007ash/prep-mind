
import React, { useState, useEffect, useRef } from 'react';
import { convertSpeechToText } from '../../utils/speechToText';
import { toast } from 'sonner';
import AudioCapture from './AudioCapture';
import ProcessingStatus from './ProcessingStatus';

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
      <AudioCapture
        audioLevel={audioLevel}
        recordingTime={recordingTime}
        maxRecordingTime={maxRecordingTime}
        silenceDetected={silenceDetected}
        stopRecording={stopRecording}
      />
    );
  }
  
  // Processing state
  return (
    <ProcessingStatus 
      processingStatus={processingStatus}
      transcript={transcript}
    />
  );
};

export default VoiceRecorder;
