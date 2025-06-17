import React from 'react';

const LayoutHeader = ({ onNavigate, currentPage }) => {
  const navItems = [
    { name: 'Inicio', page: 'home' },
    { name: 'Agregar Expediente', page: 'add' },
    { name: 'Buscar Expediente', page: 'search' },
  ];

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10 border-b border-gray-200">
      <h1 className="text-3xl font-extrabold text-gray-900">CAPCO</h1>
      <nav>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.page}>
              <button
                onClick={() => onNavigate(item.page)}
                className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === item.page
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => onNavigate('login')}
              className="text-lg font-medium px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-md"
            >
              Salir
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LayoutHeader;