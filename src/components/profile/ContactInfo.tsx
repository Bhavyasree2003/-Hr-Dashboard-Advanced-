
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, TrendingUp, Target, CheckCircle, Users } from 'lucide-react';

interface Employee {
  email: string;
  age: number;
  joinDate: string;
  projects: any[];
}

interface ContactInfoProps {
  employee: Employee;
  yearsAtCompany: number;
  completionRate: number;
}

const ContactInfo = ({ employee, yearsAtCompany, completionRate }: ContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <motion.div 
        className="bg-cyber-dark/50 p-6 rounded-lg border border-cyber-blue/20"
        whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 255, 0.5)" }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <Mail className="w-6 h-6 text-cyber-blue" />
          <span className="text-gray-400 font-medium">Contact Info</span>
        </div>
        <div className="space-y-2">
          <p className="text-white font-semibold text-lg">{employee.email}</p>
          <p className="text-gray-300">Primary Email</p>
          <div className="flex items-center space-x-2 mt-3">
            <Phone className="w-4 h-4 text-cyber-green" />
            <span className="text-cyber-green">+1 (555) 123-4567</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-cyber-dark/50 p-6 rounded-lg border border-cyber-green/20"
        whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 136, 0.5)" }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <Users className="w-6 h-6 text-cyber-green" />
          <span className="text-gray-400 font-medium">Personal Info</span>
        </div>
        <div className="space-y-2">
          <p className="text-white font-semibold text-lg">{employee.age} years old</p>
          <p className="text-gray-300">Age</p>
          <div className="flex items-center space-x-2 mt-3">
            <MapPin className="w-4 h-4 text-cyber-purple" />
            <span className="text-cyber-purple">San Francisco, CA</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-cyber-dark/50 p-6 rounded-lg border border-cyber-purple/20"
        whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <Calendar className="w-6 h-6 text-cyber-purple" />
          <span className="text-gray-400 font-medium">Employment</span>
        </div>
        <div className="space-y-2">
          <p className="text-white font-semibold text-lg">{new Date(employee.joinDate).toLocaleDateString()}</p>
          <p className="text-gray-300">Join Date</p>
          <div className="flex items-center space-x-2 mt-3">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400">{yearsAtCompany} years tenure</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-cyber-dark/50 p-6 rounded-lg border border-yellow-400/20"
        whileHover={{ scale: 1.05, borderColor: "rgba(255, 196, 0, 0.5)" }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <Target className="w-6 h-6 text-yellow-400" />
          <span className="text-gray-400 font-medium">Project Status</span>
        </div>
        <div className="space-y-2">
          <p className="text-white font-semibold text-lg">{employee.projects.filter(p => p.status === 'active').length}</p>
          <p className="text-gray-300">Active Projects</p>
          <div className="flex items-center space-x-2 mt-3">
            <CheckCircle className="w-4 h-4 text-cyber-green" />
            <span className="text-cyber-green">{completionRate}% completion rate</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;
