
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BookmarkPlus, BookmarkMinus, Building, Trophy, Clock } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  performance: number;
  avatar: string;
  isBookmarked: boolean;
  joinDate: string;
}

interface ProfileHeaderProps {
  employee: Employee;
  yearsAtCompany: number;
  onBookmark: () => void;
}

const ProfileHeader = ({ employee, yearsAtCompany, onBookmark }: ProfileHeaderProps) => {
  return (
    <motion.div 
      className="cyber-card mb-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 h-48 rounded-xl bg-gradient-to-br from-cyber-dark via-cyber-black to-cyber-purple/20" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 h-48 rounded-xl overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyber-blue rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <motion.div 
              className="w-32 h-32 bg-cyber-blue/20 rounded-full flex items-center justify-center text-6xl border-4 border-cyber-blue/30"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              {employee.avatar}
            </motion.div>
            
            <div>
              <h1 className="text-4xl font-bold text-white mb-3">{employee.name}</h1>
              <p className="text-2xl text-cyber-blue mb-3">{employee.position}</p>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline" className="border-cyber-purple text-cyber-purple text-lg px-4 py-2">
                  <Building className="w-4 h-4 mr-2" />
                  {employee.department}
                </Badge>
                <Badge variant="outline" className="border-cyber-green text-cyber-green text-lg px-4 py-2">
                  <Trophy className="w-4 h-4 mr-2" />
                  {employee.performance}/5 Performance
                </Badge>
                <Badge variant="outline" className="border-yellow-400 text-yellow-400 text-lg px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  {yearsAtCompany} Year{yearsAtCompany !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              {/* Performance stars */}
              <div className="flex items-center space-x-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      i < employee.performance 
                        ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' 
                        : 'bg-gray-600'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.3 }}
                  />
                ))}
                <span className="ml-3 text-lg font-semibold text-yellow-400">{employee.performance}/5</span>
              </div>
            </div>
          </div>

          <motion.button
            onClick={onBookmark}
            className="p-4 rounded-lg hover:bg-cyber-blue/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {employee.isBookmarked ? (
              <BookmarkMinus className="w-8 h-8 text-cyber-green" />
            ) : (
              <BookmarkPlus className="w-8 h-8 text-gray-400" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
