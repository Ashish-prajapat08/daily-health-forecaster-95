import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from 'next-themes';

const Settings = () => {
  const [notifications, setNotifications] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
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
    </div>
  );
};

export default Settings;