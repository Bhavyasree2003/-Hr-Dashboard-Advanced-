import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useHRStore } from '@/store/hrStore';

export default function SearchFilter() {
  const { 
    searchQuery, 
    selectedDepartment, 
    selectedPerformance,
    sortBy,
    sortOrder,
    setSearchQuery, 
    setSelectedDepartment,
    setSelectedPerformance,
    setSortBy,
    setSortOrder,
    employees 
  } = useHRStore();

  const departments = ['All', ...new Set(employees.map(emp => emp.department))];
  const performanceRatings = [null, 1, 2, 3, 4, 5];

  const handleSortChange = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: typeof sortBy) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <motion.div 
      className="glass-effect rounded-xl p-6 mb-8 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 via-cyber-purple/5 to-cyber-green/5"
        animate={{
          background: [
            "linear-gradient(90deg, rgba(0,255,255,0.05) 0%, rgba(139,92,246,0.05) 50%, rgba(0,255,136,0.05) 100%)",
            "linear-gradient(90deg, rgba(0,255,136,0.05) 0%, rgba(0,255,255,0.05) 50%, rgba(139,92,246,0.05) 100%)",
            "linear-gradient(90deg, rgba(139,92,246,0.05) 0%, rgba(0,255,136,0.05) 50%, rgba(0,255,255,0.05) 100%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-6 h-6 text-cyber-blue" />
          <h2 className="text-xl font-semibold text-white">Advanced Search & Filter</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-gray rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300"
            />
            <motion.div
              className="absolute inset-0 rounded-lg border border-cyber-blue opacity-0 pointer-events-none"
              animate={{ opacity: searchQuery ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Department Filter */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 bg-cyber-dark border border-cyber-gray rounded-lg text-white focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/20 transition-all duration-300 appearance-none cursor-pointer"
            >
              {departments.map(dept => (
                <option key={dept} value={dept} className="bg-cyber-dark">
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Performance Rating Filter */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <select
              value={selectedPerformance || ''}
              onChange={(e) => setSelectedPerformance(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-4 py-3 bg-cyber-dark border border-cyber-gray rounded-lg text-white focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="" className="bg-cyber-dark">All Performance Ratings</option>
              {performanceRatings.filter(rating => rating !== null).map(rating => (
                <option key={rating} value={rating} className="bg-cyber-dark">
                  {rating} Star{rating !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-400 flex items-center mr-4">Sort by:</span>
          
          <motion.button
            onClick={() => handleSortChange('name')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'name' 
                ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue' 
                : 'bg-cyber-dark text-gray-400 hover:text-white border border-cyber-gray'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Name {getSortIcon('name')}
          </motion.button>

          <motion.button
            onClick={() => handleSortChange('performance')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'performance' 
                ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green' 
                : 'bg-cyber-dark text-gray-400 hover:text-white border border-cyber-gray'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Performance {getSortIcon('performance')}
          </motion.button>

          <motion.button
            onClick={() => handleSortChange('department')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'department' 
                ? 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple' 
                : 'bg-cyber-dark text-gray-400 hover:text-white border border-cyber-gray'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Department {getSortIcon('department')}
          </motion.button>

          <motion.button
            onClick={() => handleSortChange('joinDate')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              sortBy === 'joinDate' 
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400' 
                : 'bg-cyber-dark text-gray-400 hover:text-white border border-cyber-gray'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Date {getSortIcon('joinDate')}
          </motion.button>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedDepartment !== 'All' || selectedPerformance !== null) && (
          <motion.div 
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {searchQuery && (
              <motion.span 
                className="px-3 py-1 bg-cyber-blue/20 border border-cyber-blue text-cyber-blue rounded-full text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                Search: "{searchQuery}"
              </motion.span>
            )}
            {selectedDepartment !== 'All' && (
              <motion.span 
                className="px-3 py-1 bg-cyber-purple/20 border border-cyber-purple text-cyber-purple rounded-full text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                Dept: {selectedDepartment}
              </motion.span>
            )}
            {selectedPerformance !== null && (
              <motion.span 
                className="px-3 py-1 bg-cyber-green/20 border border-cyber-green text-cyber-green rounded-full text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                Rating: {selectedPerformance} Star{selectedPerformance !== 1 ? 's' : ''}
              </motion.span>
            )}
          </motion.div>
        )}
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"
        animate={{
          x: ['-100%', '100%'],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}
