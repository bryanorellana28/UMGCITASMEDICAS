// components/Sidebar.tsx
import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = ({ userRole }: { userRole: string | null }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="h-full w-64 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Menú</h2>
      <ul className="space-y-2">
        {userRole === 'Cliente' && (
          <>
            <li>
              <button onClick={() => handleNavigation('/assign-appointment')} className="w-full text-left p-2 hover:bg-gray-300 rounded">
                Asignar Cita
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/view-appointment')} className="w-full text-left p-2 hover:bg-gray-300 rounded">
                Ver Cita
              </button>
            </li>
          </>
        )}
        {userRole === 'Médico' && (
          <li>
            <button onClick={() => handleNavigation('/view-appointment')} className="w-full text-left p-2 hover:bg-gray-300 rounded">
              Ver Cita
            </button>
          </li>
        )}
        {userRole === 'Administrador' && (
          <>
            <li>
              <button onClick={() => handleNavigation('/view-appointment')} className="w-full text-left p-2 hover:bg-gray-300 rounded">
                Ver Cita
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/register-user')} className="w-full text-left p-2 hover:bg-gray-300 rounded">
                Registrar
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
