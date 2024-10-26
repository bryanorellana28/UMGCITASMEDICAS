// pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar el token para obtener el rol del usuario
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role); // Establecer el rol del usuario
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar userRole={userRole} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
        {userRole && (
          <div className="absolute top-5 right-5 p-2 bg-gray-200 rounded">
            <p>Rol: {userRole}</p> {/* Mostrar el rol del usuario */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
