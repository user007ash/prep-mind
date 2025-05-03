
import React from 'react';
import { Progress } from '../ui/Progress';

const RecordingTimer = ({ recordingTime, maxRecordingTime }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progressPercentage = (recordingTime / maxRecordingTime) * 100;

  return (
    <>
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
    </>
  );
};

export default RecordingTimer;
