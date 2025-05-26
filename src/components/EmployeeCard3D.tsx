
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, UserPlus, Bookmark, BookmarkCheck } from 'lucide-react';
import { Employee } from '@/store/hrStore';

interface EmployeeCard3DProps {
  employee: Employee;
  index: number;
  onView: () => void;
  onPromote: () => void;
}

const EmployeeCard3D = ({ employee, index, onView, onPromote }: EmployeeCard3DProps) => {
  return (
    <motion.div
      className="cyber-card relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        boxShadow: [
          "0 10px 30px rgba(0, 255, 255, 0.1)",
          "0 20px 40px rgba(0, 255, 255, 0.2)",
          "0 10px 30px rgba(0, 255, 255, 0.1)"
        ]
      }}
      transition={{ 
        delay: index * 0.1,
        boxShadow: { duration: 2, repeat: Infinity }
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        boxShadow: "0 25px 50px rgba(0, 255, 255, 0.4)"
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #00ffff 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #00ff88 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, #00ffff 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header with Avatar and Bookmark */}
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="w-16 h-16 bg-cyber-blue/20 rounded-full flex items-center justify-center text-2xl border-2 border-cyber-blue/30 relative"
            whileHover={{ 
              scale: 1.1, 
              rotate: 10,
              borderColor: "rgba(0, 255, 255, 0.8)"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              {employee.avatar}
            </motion.div>
            
            {/* Avatar Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyber-blue/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.button
            className={`p-2 rounded-lg transition-colors ${
              employee.isBookmarked 
                ? 'text-cyber-green bg-cyber-green/20' 
                : 'text-gray-400 hover:text-cyber-blue hover:bg-cyber-blue/20'
            }`}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            {employee.isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Employee Info */}
        <div className="mb-6">
          <motion.h3 
            className="text-xl font-bold text-white mb-1"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 10px rgba(0, 255, 255, 0.8)"
            }}
          >
            {employee.name}
          </motion.h3>
          
          <motion.p 
            className="text-cyber-blue mb-1"
            animate={{
              color: ["#00ffff", "#8b5cf6", "#00ff88", "#00ffff"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {employee.position}
          </motion.p>
          
          <p className="text-sm text-gray-400 mb-2">{employee.email}</p>
          <p className="text-sm text-gray-400 mb-2">Age: {employee.age} | {employee.department}</p>
          
          {/* Performance Stars */}
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < employee.performance 
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' 
                    : 'bg-gray-600'
                }`}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.5 + i * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.3,
                  boxShadow: i < employee.performance ? "0 0 15px rgba(255, 196, 0, 0.8)" : undefined
                }}
              />
            ))}
            <span className="ml-2 text-sm text-gray-400">{employee.performance}/5</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            onClick={onView}
            className="flex-1 bg-cyber-blue/20 hover:bg-cyber-blue/40 text-cyber-blue px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-cyber-blue/30"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(0, 255, 255, 0.3)",
              boxShadow: "0 5px 15px rgba(0, 255, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </motion.button>
          
          <motion.button
            onClick={onPromote}
            className="flex-1 bg-cyber-green/20 hover:bg-cyber-green/40 text-cyber-green px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-cyber-green/30"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(0, 255, 136, 0.3)",
              boxShadow: "0 5px 15px rgba(0, 255, 136, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="w-4 h-4" />
            <span>Promote</span>
          </motion.button>
        </div>
      </div>

      {/* 3D Border Effect */}
      <div className="absolute inset-0 rounded-xl border border-cyber-blue/20 group-hover:border-cyber-blue/60 transition-colors duration-300" />
      
      {/* Corner Accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyber-blue/40" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyber-blue/40" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyber-blue/40" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyber-blue/40" />
    </motion.div>
  );
};

export default EmployeeCard3D;
