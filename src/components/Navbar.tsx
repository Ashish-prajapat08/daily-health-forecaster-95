import React from 'react';
import { User, Settings, LogOut, Activity, Heart, BarChart, PieChart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="text-3xl font-bold text-center flex-1 flex items-center justify-center space-x-2">
          <Activity className="h-8 w-8 text-yellow-300" />
          <span className="text-blue-300">S</span>
          <Heart className="h-8 w-8 text-red-300" />
          <span className="text-green-300">E</span>
          <BarChart className="h-8 w-8 text-purple-300" />
          <span className="text-orange-300">V</span>
          <PieChart className="h-8 w-8 text-pink-300" />
          <span className="text-teal-300">A</span>
        </div>
        <div className="flex-1 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;