
import React, { useState } from 'react';

const FeedbackTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex overflow-x-auto">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'overview' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'detailed' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('detailed')}
        >
          Detailed Analysis
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'communication' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('communication')}
        >
          Communication
        </button>
      </div>
    </div>
  );
};

export default FeedbackTabs;
