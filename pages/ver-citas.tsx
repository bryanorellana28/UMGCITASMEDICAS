import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const VerCitas = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const response = await fetch('/api/user-appointments', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al obtener las citas');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar userRole="Paciente" email="example@domain.com" />

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-700">Mis Citas</h2>
        {error && <p className="text-red-500">{error}</p>}
        {appointments.length === 0 ? (
          <p>No tienes citas programadas.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600">
                  Cita para {new Date(appointment.fecha).toLocaleDateString()}
                </h3>
                <p className="mt-1 text-gray-600"><strong>Hora:</strong> {appointment.hora}</p>
                <p className="mt-1 text-gray-600"><strong>Descripción:</strong> {appointment.descripcion}</p>
                <p className="mt-1 text-gray-600"><strong>Estado:</strong> {appointment.estado}</p>
                <p className="mt-1 text-gray-600"><strong>Doctor asignado:</strong> {appointment.doctorAsignado}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerCitas;
