
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Award, Star, Trophy } from 'lucide-react';

interface Employee {
  projects: any[];
  feedback: any[];
  performance: number;
  isBookmarked: boolean;
}

interface MetricsSummaryProps {
  employee: Employee;
  yearsAtCompany: number;
  completionRate: number;
  avgFeedbackScore: string;
}

const MetricsSummary = ({ employee, yearsAtCompany, completionRate, avgFeedbackScore }: MetricsSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <motion.div 
        className="bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 p-6 rounded-lg border border-cyber-blue/30"
        whileHover={{ scale: 1.02 }}
      >
        <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-3">
          <Award className="w-6 h-6 text-cyber-blue" />
          <span>Experience Metrics</span>
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Years at Company</span>
            <span className="text-cyber-blue font-semibold text-lg">{yearsAtCompany}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Projects</span>
            <span className="text-cyber-green font-semibold text-lg">{employee.projects.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Completion Rate</span>
            <span className="text-yellow-400 font-semibold text-lg">{completionRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Active Projects</span>
            <span className="text-cyber-purple font-semibold text-lg">{employee.projects.filter(p => p.status === 'active').length}</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-br from-cyber-green/10 to-cyber-blue/10 p-6 rounded-lg border border-cyber-green/30"
        whileHover={{ scale: 1.02 }}
      >
        <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-3">
          <Star className="w-6 h-6 text-cyber-green" />
          <span>Performance Summary</span>
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Current Rating</span>
            <span className="text-cyber-green font-semibold text-lg">{employee.performance}/5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Feedback Count</span>
            <span className="text-cyber-blue font-semibold text-lg">{employee.feedback.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Avg Feedback Score</span>
            <span className="text-yellow-400 font-semibold text-lg">{avgFeedbackScore}/5</span>
          </div>
          <div className="mt-4">
            <span className="text-gray-300 text-sm">Performance Trend</span>
            <Progress value={employee.performance * 20} className="w-full mt-2" />
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-br from-cyber-purple/10 to-yellow-400/10 p-6 rounded-lg border border-cyber-purple/30"
        whileHover={{ scale: 1.02 }}
      >
        <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-cyber-purple" />
          <span>Status Overview</span>
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Bookmark Status</span>
            <span className={`font-semibold ${employee.isBookmarked ? 'text-cyber-green' : 'text-gray-400'}`}>
              {employee.isBookmarked ? 'Bookmarked' : 'Not Bookmarked'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Employment Status</span>
            <span className="text-cyber-green font-semibold">Active</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Next Review</span>
            <span className="text-yellow-400 font-semibold">Q1 2025</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Salary Range</span>
            <span className="text-cyber-blue font-semibold">$85k - $120k</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MetricsSummary;
