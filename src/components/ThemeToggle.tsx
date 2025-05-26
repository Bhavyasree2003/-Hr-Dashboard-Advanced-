
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--background', '210 20% 6%');
      document.documentElement.style.setProperty('--foreground', '210 40% 98%');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--background', '0 0% 95%');
      document.documentElement.style.setProperty('--foreground', '222.2 84% 4.9%');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-cyber-dark border border-cyber-gray hover:border-cyber-blue transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-cyber-blue" />
        )}
      </motion.div>
    </motion.button>
  );
}
