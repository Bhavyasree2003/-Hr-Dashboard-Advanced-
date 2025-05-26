
import React from 'react';
import { motion } from 'framer-motion';
import { 
  SidebarProvider, 
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { 
  User, 
  BookmarkPlus, 
  FileChartLine, 
  Search
} from "lucide-react";
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { title: "Dashboard", url: "/", icon: User },
  { title: "Bookmarks", url: "/bookmarks", icon: BookmarkPlus },
  { title: "Analytics", url: "/analytics", icon: FileChartLine },
  { title: "Employee Profile", url: "/employee/1", icon: User },
];

function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive 
        ? "bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 cyber-glow" 
        : "text-gray-300 hover:bg-cyber-dark hover:text-cyber-blue"
    }`;

  return (
    <Sidebar className="w-64 bg-cyber-black border-r border-cyber-gray">
      <SidebarTrigger className="m-4 text-cyber-blue hover:bg-cyber-dark" />
      
      <SidebarContent className="px-4">
        <div className="mb-8">
          <motion.h1 
            className="text-2xl font-bold text-cyber-blue mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            HR Dashboard
          </motion.h1>
          <motion.p 
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Control Center
          </motion.p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-cyber-blue font-semibold mb-4">
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink 
                        to={item.url} 
                        end={item.url === '/'}
                        className={getNavCls}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.title}</span>
                      </NavLink>
                    </motion.div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-cyber-black">
        <AppSidebar />
        
        <main className="flex-1 relative overflow-hidden">
          {/* Enhanced animated background */}
          <div className="absolute inset-0 bg-cyber-gradient opacity-60" />
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 2, 1],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          <div className="relative z-10 p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
