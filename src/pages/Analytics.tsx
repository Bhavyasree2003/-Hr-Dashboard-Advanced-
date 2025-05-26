
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useHRStore } from '@/store/hrStore';
import Layout from '@/components/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Enhanced 3D Chart Component with advanced effects
function Chart3D({ data, type = 'bar' }: { data: any[]; type?: 'bar' | 'pie' }) {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  if (type === 'bar') {
    return (
      <group ref={groupRef}>
        {data.map((item, index) => (
          <group key={index}>
            {/* Main Bar */}
            <mesh
              position={[(index - data.length / 2) * 1.5, item.value / 3, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.8, item.value / 1.5, 0.8]} />
              <meshStandardMaterial 
                color={`hsl(${180 + index * 40}, 100%, 60%)`}
                emissive={`hsl(${180 + index * 40}, 100%, 30%)`}
                emissiveIntensity={0.4}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Glow Effect */}
            <mesh
              position={[(index - data.length / 2) * 1.5, item.value / 3, 0]}
            >
              <boxGeometry args={[1.2, item.value / 1.3, 1.2]} />
              <meshBasicMaterial 
                color={`hsl(${180 + index * 40}, 100%, 50%)`}
                transparent
                opacity={0.2}
              />
            </mesh>
            
            {/* Top Glow */}
            <mesh
              position={[(index - data.length / 2) * 1.5, item.value / 1.5 + 0.2, 0]}
            >
              <sphereGeometry args={[0.3]} />
              <meshBasicMaterial 
                color={`hsl(${180 + index * 40}, 100%, 80%)`}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {data.map((item, index) => (
        <group key={index}>
          {/* Main Sphere */}
          <mesh
            position={[
              Math.cos((index / data.length) * Math.PI * 2) * 3,
              Math.sin((index / data.length) * Math.PI * 2) * 3,
              0
            ]}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[item.value / 4]} />
            <meshStandardMaterial 
              color={`hsl(${index * 60}, 100%, 60%)`}
              emissive={`hsl(${index * 60}, 100%, 30%)`}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Orbital Ring */}
          <mesh
            position={[
              Math.cos((index / data.length) * Math.PI * 2) * 3,
              Math.sin((index / data.length) * Math.PI * 2) * 3,
              0
            ]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[item.value / 3, 0.05, 8, 32]} />
            <meshBasicMaterial 
              color={`hsl(${index * 60}, 100%, 80%)`}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Analytics() {
  const { employees, bookmarkedEmployees } = useHRStore();

  // Performance data for charts
  const performanceData = [
    { month: 'Jan', performance: 3.8 },
    { month: 'Feb', performance: 4.1 },
    { month: 'Mar', performance: 3.9 },
    { month: 'Apr', performance: 4.3 },
    { month: 'May', performance: 4.0 },
    { month: 'Jun', performance: 4.5 },
  ];

  const departmentData = [
    { name: 'Engineering', value: employees.filter(emp => emp.department === 'Engineering').length, color: '#00ffff' },
    { name: 'Design', value: employees.filter(emp => emp.department === 'Design').length, color: '#8b5cf6' },
    { name: 'Marketing', value: employees.filter(emp => emp.department === 'Marketing').length, color: '#00ff88' },
    { name: 'HR', value: employees.filter(emp => emp.department === 'HR').length, color: '#ff6b6b' },
    { name: 'Sales', value: employees.filter(emp => emp.department === 'Sales').length, color: '#ffd93d' },
  ];

  const bookmarkTrends = [
    { month: 'Jan', bookmarks: 12 },
    { month: 'Feb', bookmarks: 19 },
    { month: 'Mar', bookmarks: 15 },
    { month: 'Apr', bookmarks: 22 },
    { month: 'May', bookmarks: 18 },
    { month: 'Jun', bookmarks: bookmarkedEmployees.length },
  ];

  const performanceMetrics = [
    { rating: '5 Stars', count: employees.filter(emp => emp.performance === 5).length },
    { rating: '4 Stars', count: employees.filter(emp => emp.performance === 4).length },
    { rating: '3 Stars', count: employees.filter(emp => emp.performance === 3).length },
    { rating: '2 Stars', count: employees.filter(emp => emp.performance === 2).length },
    { rating: '1 Star', count: employees.filter(emp => emp.performance === 1).length },
  ];

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
          <h1 className="text-4xl font-bold text-white mb-2">
            Advanced Analytics Dashboard
            <motion.span 
              className="text-cyber-blue ml-2"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                textShadow: [
                  "0 0 10px #00ffff",
                  "0 0 30px #00ffff",
                  "0 0 50px #00ffff",
                  "0 0 30px #00ffff",
                  "0 0 10px #00ffff"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              📊
            </motion.span>
          </h1>
          <p className="text-xl text-gray-400">
            Next-generation 3D data visualization and insights
          </p>
        </motion.div>

        {/* Enhanced Key Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { 
              title: 'Avg Performance', 
              value: (employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length).toFixed(1),
              suffix: '/5',
              color: 'cyber-blue'
            },
            { 
              title: 'Active Projects', 
              value: employees.reduce((acc, emp) => acc + emp.projects.filter(p => p.status === 'active').length, 0),
              suffix: '',
              color: 'cyber-green'
            },
            { 
              title: 'Bookmark Rate', 
              value: Math.round((bookmarkedEmployees.length / employees.length) * 100),
              suffix: '%',
              color: 'cyber-purple'
            },
            { 
              title: 'Departments', 
              value: new Set(employees.map(emp => emp.department)).size,
              suffix: '',
              color: 'yellow-400'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              className="cyber-card text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 25px 50px rgba(0, 255, 255, 0.4)`
              }}
            >
              {/* Animated holographic background */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    `linear-gradient(45deg, transparent, var(--${metric.color}), transparent)`,
                    `linear-gradient(135deg, transparent, var(--${metric.color}), transparent)`,
                    `linear-gradient(225deg, transparent, var(--${metric.color}), transparent)`,
                    `linear-gradient(315deg, transparent, var(--${metric.color}), transparent)`,
                    `linear-gradient(45deg, transparent, var(--${metric.color}), transparent)`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.h3 
                className={`text-3xl font-bold text-${metric.color} mb-2 relative z-10`}
                animate={{ 
                  textShadow: [
                    `0 0 10px var(--${metric.color})`,
                    `0 0 20px var(--${metric.color})`,
                    `0 0 30px var(--${metric.color})`,
                    `0 0 20px var(--${metric.color})`,
                    `0 0 10px var(--${metric.color})`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {metric.value}{metric.suffix}
              </motion.h3>
              <p className="text-gray-400 relative z-10">{metric.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced 3D Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 3D Performance Chart */}
          <motion.div 
            className="cyber-card relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10"
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                background: [
                  "linear-gradient(45deg, rgba(0,255,255,0.1), rgba(139,92,246,0.1))",
                  "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(139,92,246,0.2))",
                  "linear-gradient(225deg, rgba(0,255,255,0.1), rgba(139,92,246,0.1))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <h3 className="text-xl font-semibold text-white mb-4 relative z-10">3D Performance Analytics</h3>
            <div className="h-80 relative">
              <Canvas camera={{ position: [0, 2, 10] }} shadows>
                <ambientLight intensity={0.3} />
                <pointLight position={[15, 15, 15]} intensity={2} color="#00ffff" castShadow />
                <pointLight position={[-15, -15, -15]} intensity={1.5} color="#8b5cf6" />
                <pointLight position={[0, 15, 0]} intensity={1.8} color="#00ff88" />
                <spotLight 
                  position={[10, 10, 5]} 
                  intensity={2} 
                  color="#ffffff" 
                  castShadow 
                  angle={0.3}
                  penumbra={0.2}
                />
                <fog attach="fog" args={['#000000', 5, 25]} />
                <Chart3D data={[
                  { month: 'Jan', value: 3.8 },
                  { month: 'Feb', value: 4.1 },
                  { month: 'Mar', value: 3.9 },
                  { month: 'Apr', value: 4.3 },
                  { month: 'May', value: 4.0 },
                  { month: 'Jun', value: 4.5 }
                ]} type="bar" />
              </Canvas>
            </div>
          </motion.div>

          {/* 3D Department Distribution */}
          <motion.div 
            className="cyber-card relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 to-cyber-purple/10"
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                background: [
                  "linear-gradient(45deg, rgba(0,255,136,0.1), rgba(139,92,246,0.1))",
                  "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(139,92,246,0.2))",
                  "linear-gradient(225deg, rgba(0,255,136,0.1), rgba(139,92,246,0.1))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <h3 className="text-xl font-semibold text-white mb-4 relative z-10">3D Department Sphere</h3>
            <div className="h-80 relative">
              <Canvas camera={{ position: [0, 0, 12] }} shadows>
                <ambientLight intensity={0.3} />
                <pointLight position={[15, 15, 15]} intensity={2.5} color="#00ffff" castShadow />
                <pointLight position={[-15, -15, -15]} intensity={2} color="#8b5cf6" />
                <pointLight position={[0, 15, 0]} intensity={2.2} color="#00ff88" />
                <spotLight 
                  position={[0, 0, 15]} 
                  intensity={3} 
                  color="#ffffff" 
                  castShadow 
                  angle={0.5}
                  penumbra={0.3}
                />
                <fog attach="fog" args={['#000000', 5, 30]} />
                <Chart3D data={[
                  { name: 'Engineering', value: employees.filter(emp => emp.department === 'Engineering').length },
                  { name: 'Design', value: employees.filter(emp => emp.department === 'Design').length },
                  { name: 'Marketing', value: employees.filter(emp => emp.department === 'Marketing').length },
                  { name: 'HR', value: employees.filter(emp => emp.department === 'HR').length },
                  { name: 'Sales', value: employees.filter(emp => emp.department === 'Sales').length }
                ]} type="pie" />
              </Canvas>
            </div>
          </motion.div>
        </div>

        {/* Traditional Charts with enhanced styling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Trends */}
          <motion.div 
            className="cyber-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #00ffff',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#00ffff" 
                  strokeWidth={3}
                  dot={{ fill: '#00ffff', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#00ffff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Distribution */}
          <motion.div 
            className="cyber-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Performance Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="rating" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bookmark Trends */}
          <motion.div 
            className="cyber-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Bookmark Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={bookmarkTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #00ff88',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="bookmarks" 
                  stroke="#00ff88" 
                  strokeWidth={3}
                  dot={{ fill: '#00ff88', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Department Pie Chart */}
          <motion.div 
            className="cyber-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Department Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #00ffff',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
