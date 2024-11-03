// components/Sidebar.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface SidebarProps {
  userRole: string | null;
  email: string | null; // Propiedad para el correo electrónico
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, email }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el JWT del localStorage
    router.push('/login'); // Redirige a la página de login
  };

  return (
    <div className="h-full w-64 bg-gray-200 p-4">
      <div className="mb-6 p-4 bg-white rounded shadow">
        {email && (
          <p className="text-sm text-gray-600">
            Email: <span className="font-semibold">{email}</span>
          </p>
        )}
        {userRole && (
          <p className="text-sm text-gray-600">
            Rol: <span className="font-semibold">{userRole}</span>
          </p>
        )}
      </div>
      <h2 className="text-lg font-bold mb-4">Menú</h2>
      <ul className="space-y-2">
        {userRole === 'Paciente' && (
          <>
            <li>
              <button
                onClick={() => handleNavigation('/assign-appointment')}
                className="w-full text-left p-2 hover:bg-gray-300 rounded transition-colors duration-200"
              >
                Asignar Cita
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/view-appointment')}
                className="w-full text-left p-2 hover:bg-gray-300 rounded transition-colors duration-200"
              >
                Ver Cita
              </button>
            </li>
          </>
        )}
        {userRole === 'Medico' && (
          <li>
            <button
              onClick={() => handleNavigation('/view-appointment')}
              className="w-full text-left p-2 hover:bg-gray-300 rounded transition-colors duration-200"
            >
              Ver Cita
            </button>
          </li>
        )}
        {userRole === 'Administrador' && (
          <>
            <li>
              <button
                onClick={() => handleNavigation('/view-appointment')}
                className="w-full text-left p-2 hover:bg-gray-300 rounded transition-colors duration-200"
              >
                Ver Cita
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/register-user')}
                className="w-full text-left p-2 hover:bg-gray-300 rounded transition-colors duration-200"
              >
                Registrar
              </button>
            </li>
          </>
        )}
      </ul>
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full text-left p-2 bg-red-500 text-white hover:bg-red-600 rounded transition-colors duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
