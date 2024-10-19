import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = ({ onLogin }) => {
  const [oldUser, setOldUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    if (oldUser && password) {
      onLogin();
    } else {
      alert('Please enter both Old User and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <svg className="mx-auto h-16 w-auto" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#3B82F6">SEVA</text>
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-600">Empowering You Towards Better Health</h2>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <Label htmlFor="oldUser" className="block text-gray-700 text-sm font-bold mb-2">Old User</Label>
            <Input
              id="oldUser"
              type="text"
              value={oldUser}
              onChange={(e) => setOldUser(e.target.value)}
              required
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div></div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot Password?</a>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline text-lg">
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;