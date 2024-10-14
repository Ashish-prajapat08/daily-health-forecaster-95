import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  // Mock data - in a real app, this would come from a user context or API
  const user = {
    name: "John Doe",
    age: 30,
    healthId: "HD123456",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    photoUrl: "https://example.com/john-doe-photo.jpg"
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6 mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.photoUrl} alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">Age: {user.age}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="font-semibold">Health ID:</label>
          <p>{user.healthId}</p>
        </div>
        <div>
          <label className="font-semibold">Email:</label>
          <p>{user.email}</p>
        </div>
        <div>
          <label className="font-semibold">Phone Number:</label>
          <p>{user.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;