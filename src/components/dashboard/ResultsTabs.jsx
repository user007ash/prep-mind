
import React from 'react';
import TestResultsList from './TestResults';

const ResultsTabs = ({ activeTab, setActiveTab, testResults, resultsLoading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 dark:border-gray-700">
        <div className="flex">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'interviews' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('interviews')}
          >
            Interviews
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'resumes' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('resumes')}
          >
            Resumes
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <TestResultsList 
          activeTab={activeTab} 
          testResults={testResults} 
          resultsLoading={resultsLoading} 
        />
      </div>
    </div>
  );
};

export default ResultsTabs;
