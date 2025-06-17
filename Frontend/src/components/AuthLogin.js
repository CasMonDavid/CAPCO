import React, { useState } from 'react';

const AuthLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
    } else {
      setError('Usuario o contraseña incorrectos. ¡Intenta de nuevo, campeón!');
    }
  };

  const inputClass = "w-full px-0 py-3 mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent text-lg placeholder-gray-500";

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="w-full bg-white shadow-md py-4 px-6 flex justify-start items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">CAPCO</h1>
      </div>
      <div className="flex flex-grow items-center justify-center w-full p-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg border border-gray-200 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">Bienvenido</h2>
          <p className="text-center text-gray-500 mb-8 text-lg">Inicia sesión para continuar</p>
          {error && <p className="text-red-500 text-center mb-4 text-base">{error}</p>}
          <input
            type="text"
            placeholder="Usuario"
            className={inputClass}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 font-semibold text-xl shadow-lg transform hover:scale-105 mt-6"
          >
            Iniciar Sesión
          </button>
          <p className="text-center text-gray-500 mt-6 text-sm">
            © 2025 CAPCO, Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;

// DONE