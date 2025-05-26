
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Employee {
  projects: any[];
  feedback: any[];
  performance: number;
}

interface ProfileTabsProps {
  employee: Employee;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs = ({ employee, activeTab, setActiveTab }: ProfileTabsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-cyber-dark border border-cyber-gray">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-black"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="projects"
            className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-black"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger 
            value="feedback"
            className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-black"
          >
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              className="cyber-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Department Overview</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-2">Performance Trend (Last 6 months)</p>
                  <div className="h-32 bg-cyber-black/50 rounded-lg flex items-end justify-center space-x-2 p-4">
                    {[3, 4, 3, 5, 4, 5].map((height, i) => (
                      <motion.div
                        key={i}
                        className="bg-cyber-blue rounded-t"
                        style={{ width: '20px', height: `${height * 15}px` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height * 15}px` }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 mb-2">Activity Level</p>
                  <Progress value={employee.performance * 20} className="w-full" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="cyber-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Projects</span>
                  <span className="text-cyber-blue font-semibold">
                    {employee.projects.filter(p => p.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed Projects</span>
                  <span className="text-cyber-green font-semibold">
                    {employee.projects.filter(p => p.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Feedback Score</span>
                  <span className="text-yellow-400 font-semibold">
                    {employee.feedback.reduce((acc, f) => acc + f.rating, 0) / employee.feedback.length || 0}/5
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <div className="grid gap-4">
            {employee.projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="cyber-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                  <Badge 
                    variant="outline"
                    className={`${
                      project.status === 'completed' ? 'border-cyber-green text-cyber-green' :
                      project.status === 'active' ? 'border-cyber-blue text-cyber-blue' :
                      'border-yellow-400 text-yellow-400'
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{project.completion}%</span>
                  </div>
                  <Progress value={project.completion} className="w-full" />
                  <p className="text-sm text-gray-400">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <div className="space-y-4">
            {employee.feedback.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                className="cyber-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{feedback.author}</h4>
                    <p className="text-sm text-gray-400">{new Date(feedback.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full ${
                          i < feedback.rating ? 'bg-yellow-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{feedback.comment}</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProfileTabs;
