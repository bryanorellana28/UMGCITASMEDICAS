// pages/assign-appointment.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';

const AssignAppointment = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(decodedToken.email);
    }
  }, []);

  const fetchAvailableHours = async (date: string) => {
    const response = await fetch('/api/available-hours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    });

    if (response.ok) {
      const hours = await response.json();
      setAvailableHours(hours);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchAvailableHours(date);
  };

  const handleAssignAppointment = async () => {
    if (!selectedHour) {
      alert('Por favor, selecciona una hora.');
      return;
    }

    const response = await fetch('/api/assign-appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        fecha: selectedDate,
        hora: selectedHour,
        descripcion: description,
        estado: 'pendiente',
      }),
    });

    if (response.ok) {
      alert('Cita asignada exitosamente');
      router.push('/dashboard');
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Error al asignar la cita');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar userRole="Paciente" email={userEmail} />

      {/* Contenido Principal */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Asignar Cita</h2>

          <label className="block mb-2 text-gray-600">Fecha de la Cita</label>
          <input
            type="date"
            onChange={handleDateChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block mb-2 text-gray-600">Hora Disponible</label>
          <select
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una hora
            </option>
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>

          <label className="block mb-2 text-gray-600">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción de la cita"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />

          <button
            onClick={handleAssignAppointment}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Asignar Cita
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAppointment;
