// pages/assign-appointment.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const AssignAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [patientEmail, setPatientEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableHours(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableHours = async (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    try {
      const response = await axios.get(`/api/appointments/available-hours?date=${formattedDate}`);
      setAvailableHours(response.data.hours);
    } catch (error) {
      console.error("Error fetching available hours:", error);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedHour(null);
  };

  const handleHourSelection = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleSubmit = async () => {
    if (!patientEmail || !selectedDate || !selectedHour) {
      return alert("Complete todos los campos");
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const appointmentData = {
      email: patientEmail,
      date: formattedDate,
      hour: selectedHour,
      status: "Pendiente asignación médico",
    };

    try {
      await axios.post('/api/appointments', appointmentData);
      alert("Cita asignada con éxito");
      router.push('/dashboard');
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Hubo un error al asignar la cita");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asignar Cita</h1>
      <div className="mb-4">
        <label className="block mb-2">Correo del paciente:</label>
        <input
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Ingrese el correo del paciente"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Seleccione una fecha:</label>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()}
        />
      </div>
      {selectedDate && (
        <div className="mb-4">
          <label className="block mb-2">Seleccione una hora:</label>
          <div className="grid grid-cols-3 gap-2">
            {availableHours.map((hour) => (
              <button
                key={hour}
                onClick={() => handleHourSelection(hour)}
                className={`p-2 rounded ${selectedHour === hour ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Asignar Cita
      </button>
    </div>
  );
};

export default AssignAppointment;
