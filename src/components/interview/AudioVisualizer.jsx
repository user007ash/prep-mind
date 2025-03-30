
import React, { useEffect, useState } from 'react';

const AudioVisualizer = ({ audioLevel }) => {
  return (
    <div className="relative w-20 h-20 mb-4">
      <div className="absolute inset-0 rounded-full bg-red-100 flex items-center justify-center">
        <div 
          className="w-14 h-14 rounded-full bg-red-500 animate-pulse-soft"
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
  );
};

export default AudioVisualizer;
