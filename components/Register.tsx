// components/Register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router'; // Importar useRouter

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Paciente'); // Rol por defecto
  const [error, setError] = useState(''); // Estado para manejar errores
  const router = useRouter(); // Inicializar useRouter

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }), // Agregar rol al cuerpo
    });

    if (response.ok) {
      // Redirigir al usuario a la página de login
      router.push('/login'); // Redirección a la página de login
    } else {
      // Manejar errores (por ejemplo, mostrar un mensaje al usuario)
      const errorData = await response.json();
      setError(errorData.message || 'Error al registrarse'); // Establecer mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Registro</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>} {/* Mostrar mensaje de error */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="Paciente">Paciente</option>
          <option value="Medico">Medico</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mb-4">
          Registrarse
        </button>
        <button 
          type="button" 
          onClick={() => router.push('/login')} // Redirigir a la página de login
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Regresar al Login
        </button>
      </form>
    </div>
  );
};

export default Register;
