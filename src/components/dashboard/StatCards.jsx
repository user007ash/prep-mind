
import React from 'react';
import { User, Calendar, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '../ui/progress';

const StatCard = ({ title, value, icon, trend, subtitle }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 ${
            trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {trend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : trend < 0 ? (
              <TrendingDown className="h-4 w-4" />
            ) : null}
            <span className="text-sm font-medium">
              {trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : '0%'}
            </span>
          </div>
        )}
      </div>
      
      {typeof value === 'string' && value.endsWith('%') && !isNaN(parseInt(value)) && (
        <div className="mt-4">
          <Progress value={parseInt(value)} className="h-1.5" />
        </div>
      )}
    </div>
  );
};

const DashboardStats = ({ testResults }) => {
  // Calculate average scores
  const calcAverageScore = (field) => {
    if (!testResults || testResults.length === 0) return "N/A";
    
    const validResults = testResults.filter(r => r[field] !== null && r[field] !== undefined);
    if (validResults.length === 0) return "N/A";
    
    const avg = Math.round(
      validResults.reduce((acc, curr) => acc + (curr[field] || 0), 0) / validResults.length
    );
    
    return `${avg}%`;
  };
  
  // Calculate trend (comparing latest result to previous results)
  const calculateTrend = (field) => {
    if (!testResults || testResults.length < 2) return 0;
    
    const validResults = testResults.filter(r => r[field] !== null && r[field] !== undefined);
    if (validResults.length < 2) return 0;
    
    const latest = validResults[0][field];
    const previous = validResults[1][field];
    
    if (!latest || !previous) return 0;
    
    return Math.round(((latest - previous) / previous) * 100);
  };
  
  const avgATS = calcAverageScore('ats_score');
  const avgInterview = calcAverageScore('total_score');
  const atsTrend = calculateTrend('ats_score');
  const interviewTrend = calculateTrend('total_score');
  
  // Get the latest sentiment analysis
  const latestSentiment = testResults && testResults.length > 0 
    ? testResults[0].sentiment_analysis || "Not available"
    : "Not available";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Average ATS Score" 
        value={avgATS}
        icon={<User className="h-6 w-6" />}
        trend={atsTrend}
        subtitle={testResults.length > 0 ? `Based on ${testResults.length} results` : "No results yet"}
      />
      <StatCard 
        title="Average Interview Score" 
        value={avgInterview}
        icon={<Calendar className="h-6 w-6" />}
        trend={interviewTrend}
        subtitle={testResults.length > 0 ? `Based on ${testResults.length} results` : "No results yet"}
      />
      <StatCard 
        title="Tests Completed" 
        value={testResults.length.toString()}
        icon={<Search className="h-6 w-6" />}
        subtitle={testResults.length > 0 ? `Last tone: ${latestSentiment}` : "Complete your first test"}
      />
    </div>
  );
};

export { StatCard, DashboardStats };
