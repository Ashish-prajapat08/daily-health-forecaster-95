import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from 'next-themes';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [notifications, setNotifications] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab="settings"
        setActiveTab={() => {}}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col">
        <Navbar onLogout={handleLogout} />
        <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'} mt-16`}>
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-lg dark:text-white">Notifications</Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-lg dark:text-white">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={theme === 'dark'}
                  onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
              </div>
            </div>
            <Button className="mt-6" onClick={() => navigate('/')}>Back to Dashboard</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;