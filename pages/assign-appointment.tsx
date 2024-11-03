// pages/assign-appointment.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AssignAppointment = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string>(''); // Estado para la hora seleccionada
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
        hora: selectedHour, // Usar la hora seleccionada
        descripcion: description,
        estado: 'pendiente', // Estado inicial
      }),
    });

    if (response.ok) {
      alert('Cita asignada exitosamente');
      router.push('/dashboard'); // Redirigir a otra página si es necesario
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Error al asignar la cita');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4 text-xl font-bold">Asignar Cita</h2>
      <input
        type="date"
        onChange={handleDateChange}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <select 
        className="mb-4 p-2 border rounded w-full" 
        value={selectedHour} 
        onChange={(e) => setSelectedHour(e.target.value)} // Actualiza la hora seleccionada
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
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción de la cita"
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        onClick={handleAssignAppointment}
        className="bg-green-500 text-white p-2 rounded"
      >
        Asignar
      </button>
    </div>
  );
};

export default AssignAppointment;
