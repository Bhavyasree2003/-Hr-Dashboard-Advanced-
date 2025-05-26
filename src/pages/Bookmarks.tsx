
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHRStore } from '@/store/hrStore';
import Layout from '@/components/Layout';
import EmployeeCard3D from '@/components/EmployeeCard3D';
import { BookmarkPlus } from 'lucide-react';

export default function Bookmarks() {
  const navigate = useNavigate();
  const { bookmarkedEmployees, setSelectedEmployee } = useHRStore();

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    navigate(`/employee/${employee.id}`);
  };

  const handlePromoteEmployee = (employee: any) => {
    console.log('Promoting employee:', employee.name);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <BookmarkPlus className="w-8 h-8 text-cyber-blue" />
            <div>
              <h1 className="text-4xl font-bold text-white">Bookmarked Employees</h1>
              <p className="text-xl text-gray-400">
                Your saved team members for quick access
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating Dashboard Dock */}
        <motion.div 
          className="glass-effect rounded-xl p-6 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Quick Access Dock</h2>
              <p className="text-gray-400 text-sm">
                {bookmarkedEmployees.length} bookmarked employees
              </p>
            </div>
            
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {bookmarkedEmployees.slice(0, 5).map((employee, index) => (
                <motion.button
                  key={employee.id}
                  onClick={() => handleViewEmployee(employee)}
                  className="w-12 h-12 bg-cyber-blue/20 rounded-full flex items-center justify-center text-lg border border-cyber-blue/30 hover:bg-cyber-blue/40 transition-colors"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {employee.avatar}
                </motion.button>
              ))}
              
              {bookmarkedEmployees.length > 5 && (
                <motion.div
                  className="w-12 h-12 bg-cyber-gray rounded-full flex items-center justify-center text-sm text-gray-400 border border-cyber-gray"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  +{bookmarkedEmployees.length - 5}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Bookmarked Employees Grid */}
        {bookmarkedEmployees.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {bookmarkedEmployees.map((employee, index) => (
              <EmployeeCard3D
                key={employee.id}
                employee={employee}
                index={index}
                onView={() => handleViewEmployee(employee)}
                onPromote={() => handlePromoteEmployee(employee)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="text-8xl mb-6"
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              📑
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Bookmarks Yet</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Start bookmarking your favorite team members from the dashboard for quick access and better organization.
            </p>
            <motion.button
              onClick={() => navigate('/')}
              className="cyber-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Employees
            </motion.button>
          </motion.div>
        )}

        {/* Bookmark Statistics */}
        {bookmarkedEmployees.length > 0 && (
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="cyber-card text-center">
              <h3 className="text-2xl font-bold text-cyber-blue mb-2">
                {bookmarkedEmployees.filter(emp => emp.performance >= 4).length}
              </h3>
              <p className="text-gray-400">Top Performers</p>
            </div>
            
            <div className="cyber-card text-center">
              <h3 className="text-2xl font-bold text-cyber-green mb-2">
                {bookmarkedEmployees.reduce((acc, emp) => acc + emp.projects.filter(p => p.status === 'active').length, 0)}
              </h3>
              <p className="text-gray-400">Active Projects</p>
            </div>
            
            <div className="cyber-card text-center">
              <h3 className="text-2xl font-bold text-cyber-purple mb-2">
                {new Set(bookmarkedEmployees.map(emp => emp.department)).size}
              </h3>
              <p className="text-gray-400">Departments</p>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
