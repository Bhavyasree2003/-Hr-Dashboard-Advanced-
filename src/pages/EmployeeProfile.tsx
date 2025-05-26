
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHRStore } from '@/store/hrStore';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ContactInfo from '@/components/profile/ContactInfo';
import MetricsSummary from '@/components/profile/MetricsSummary';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function EmployeeProfile() {
  const navigate = useNavigate();
  const { employees, toggleBookmark } = useHRStore();
  const [activeTab, setActiveTab] = useState('overview');

  const handleBookmark = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      toggleBookmark(employee.id);
      toast({
        title: employee.isBookmarked ? "Bookmark Removed" : "Bookmark Added",
        description: `${employee.name} has been ${employee.isBookmarked ? 'removed from' : 'added to'} your bookmarks.`,
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-cyber-blue hover:text-white mb-6 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </motion.button>

        {/* Page Title */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">All Employee Profiles</h1>
          <p className="text-xl text-gray-400">Detailed view of all team members</p>
        </motion.div>

        {/* All Employees */}
        {employees.map((employee, index) => {
          // Calculate metrics for each employee
          const yearsAtCompany = Math.floor((new Date().getTime() - new Date(employee.joinDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
          const completionRate = employee.projects.length > 0 ? Math.round((employee.projects.filter(p => p.status === 'completed').length / employee.projects.length) * 100) : 0;
          const avgFeedbackScore = employee.feedback.length > 0 ? (employee.feedback.reduce((acc, f) => acc + f.rating, 0) / employee.feedback.length).toFixed(1) : '0';

          return (
            <motion.div 
              key={employee.id}
              className="mb-16 last:mb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Profile Header */}
              <ProfileHeader 
                employee={employee}
                yearsAtCompany={yearsAtCompany}
                onBookmark={() => handleBookmark(employee.id)}
              />

              {/* Contact Information Grid */}
              <ContactInfo 
                employee={employee}
                yearsAtCompany={yearsAtCompany}
                completionRate={completionRate}
              />

              {/* Metrics Summary */}
              <MetricsSummary 
                employee={employee}
                yearsAtCompany={yearsAtCompany}
                completionRate={completionRate}
                avgFeedbackScore={avgFeedbackScore}
              />

              {/* Tabbed Content */}
              <ProfileTabs 
                employee={employee}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Separator between employees */}
              {index < employees.length - 1 && (
                <div className="mt-16 border-t border-cyber-gray/30" />
              )}
            </motion.div>
          );
        })}
      </div>
    </Layout>
  );
}
