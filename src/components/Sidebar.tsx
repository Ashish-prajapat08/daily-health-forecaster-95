import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Home, User, Activity as ActivityIcon, BarChart, LineChart, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const sidebarItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Profile', icon: User },
    { name: 'Health Insights', icon: ActivityIcon },
    { name: 'Activity', icon: BarChart },
    { name: 'Progress Tracking', icon: LineChart },
    { name: 'Recommendations', icon: LineChart },
  ];

  return (
    <aside className={`bg-black text-white h-screen fixed left-0 top-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <Button variant="ghost" className="w-full p-4" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </Button>
      {isOpen && (
        <>
          <nav className="mt-6">
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                variant={activeTab === item.name.toLowerCase().replace(' ', '-') ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab(item.name.toLowerCase().replace(' ', '-'))}
                className="w-full justify-start px-4 py-2 text-left"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
          <Button variant="ghost" className="w-full justify-start px-4 py-2 text-left absolute bottom-4">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      )}
    </aside>
  );
};

export default Sidebar;