import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHRStore } from '@/store/hrStore';
import Layout from '@/components/Layout';
import SearchFilter from '@/components/SearchFilter';
import EmployeeCard3D from '@/components/EmployeeCard3D';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const { 
    employees, 
    searchQuery, 
    selectedDepartment, 
    selectedPerformance, 
    sortBy, 
    sortOrder,
    setSelectedEmployee 
  } = useHRStore();

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    // First filter employees
    let filtered = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
      
      const matchesPerformance = selectedPerformance === null || employee.performance === selectedPerformance;
      
      return matchesSearch && matchesDepartment && matchesPerformance;
    });

    // Then sort employees
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'performance':
          comparison = a.performance - b.performance;
          break;
        case 'department':
          comparison = a.department.localeCompare(b.department);
          break;
        case 'joinDate':
          comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [employees, searchQuery, selectedDepartment, selectedPerformance, sortBy, sortOrder]);

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    navigate(`/employee/${employee.id}`);
  };

  const handlePromoteEmployee = (employee: any) => {
    toast({
      title: "Employee Promoted! 🎉",
      description: `${employee.name} has been promoted successfully.`,
    });
  };

  const handleAddEmployee = () => {
    setIsAddEmployeeOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Employee Button */}
        <motion.div 
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              HR Dashboard
              <motion.span 
                className="text-cyber-blue ml-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⚡
              </motion.span>
            </h1>
            <p className="text-xl text-gray-400">
              Manage your team with futuristic precision
            </p>
          </div>

          <motion.button
            onClick={handleAddEmployee}
            className="bg-cyber-green/20 hover:bg-cyber-green/40 text-cyber-green px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 border border-cyber-green/30"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(0, 255, 136, 0.3)",
              boxShadow: "0 10px 30px rgba(0, 255, 136, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-semibold">Add Employee</span>
          </motion.button>
        </motion.div>

        {/* Search and Filter */}
        <SearchFilter />

        {/* Statistics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            { label: 'Total Employees', value: employees.length, color: 'cyber-blue' },
            { label: 'Active Projects', value: employees.reduce((acc, emp) => acc + emp.projects.filter(p => p.status === 'active').length, 0), color: 'cyber-green' },
            { label: 'Top Performers', value: employees.filter(emp => emp.performance >= 4).length, color: 'cyber-purple' },
            { label: 'Bookmarked', value: employees.filter(emp => emp.isBookmarked).length, color: 'yellow-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="cyber-card text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: `0 20px 40px rgba(0, 255, 255, 0.3)`
              }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    `radial-gradient(circle at 50% 50%, var(--${stat.color}) 0%, transparent 70%)`,
                    `radial-gradient(circle at 30% 30%, var(--${stat.color}) 0%, transparent 70%)`,
                    `radial-gradient(circle at 70% 70%, var(--${stat.color}) 0%, transparent 70%)`,
                    `radial-gradient(circle at 50% 50%, var(--${stat.color}) 0%, transparent 70%)`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.h3 
                className={`text-3xl font-bold text-${stat.color} mb-2 relative z-10`}
                animate={{ 
                  scale: [1, 1.1, 1],
                  textShadow: [
                    `0 0 10px var(--${stat.color})`,
                    `0 0 20px var(--${stat.color})`,
                    `0 0 10px var(--${stat.color})`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-400 relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Employee Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredAndSortedEmployees.map((employee, index) => (
            <EmployeeCard3D
              key={employee.id}
              employee={employee}
              index={index}
              onView={() => handleViewEmployee(employee)}
              onPromote={() => handlePromoteEmployee(employee)}
            />
          ))}
        </motion.div>

        {/* No results */}
        {filteredAndSortedEmployees.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔍
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">No employees found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeForm
        isOpen={isAddEmployeeOpen}
        onClose={() => setIsAddEmployeeOpen(false)}
      />
    </Layout>
  );
};

export default Index;
