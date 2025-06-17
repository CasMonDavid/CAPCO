import React from 'react';

const HomeDashboard = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center max-w-md border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">¡Bienvenido a CAPCO!</h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Aquí podrás gestionar todos tus expedientes de forma eficiente y segura.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => onNavigate('add')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Agregar Nuevo Expediente
          </button>
          <button
            onClick={() => onNavigate('search')}
            className="w-full bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-md text-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Buscar Expediente
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;