// pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar userRole={userRole} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
        {userRole && (
          <div className="absolute top-5 right-5 p-2 bg-gray-200 rounded">
            <p>Rol: {userRole}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
