
import React, { useEffect, useRef } from 'react';
import AudioVisualizer from './AudioVisualizer';
import RecordingTimer from './RecordingTimer';

const AudioCapture = ({ 
  audioLevel, 
  recordingTime, 
  maxRecordingTime, 
  silenceDetected, 
  stopRecording 
}) => {
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
};

export default AudioCapture;
