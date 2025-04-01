
import React from 'react';
import { User, Calendar, Search } from 'lucide-react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardStats = ({ testResults }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Average ATS Score" 
        value={testResults.length > 0 
          ? Math.round(testResults.reduce((acc, curr) => acc + (curr.ats_score || 0), 0) / testResults.length) + '%'
          : "N/A"}
        icon={<User className="h-6 w-6" />}
      />
      <StatCard 
        title="Average Interview Score" 
        value={testResults.length > 0 
          ? Math.round(testResults.reduce((acc, curr) => acc + (curr.total_score || 0), 0) / testResults.length) + '%'
          : "N/A"}
        icon={<Calendar className="h-6 w-6" />}
      />
      <StatCard 
        title="Tests Completed" 
        value={testResults.length.toString()}
        icon={<Search className="h-6 w-6" />}
      />
    </div>
  );
};

export { StatCard, DashboardStats };
