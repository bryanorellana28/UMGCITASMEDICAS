// components/Login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Manejar el almacenamiento del token JWT aquí si es necesario
      const { token } = await response.json();
      localStorage.setItem('token', token); // Almacenar el token en localStorage
      router.push('/dashboard'); // Redirigir al dashboard
    } else {
      // Manejar errores (por ejemplo, mostrar un mensaje al usuario)
      const errorData = await response.json();
      alert(errorData.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Iniciar Sesión</h2>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">
          Iniciar Sesión
        </button>
        <button 
          onClick={() => router.push('/register')} // Redirigir a la página de registro
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;