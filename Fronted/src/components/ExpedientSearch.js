import React, { useState } from 'react';

const ExpedientSearch = ({ expedients, onSelectExpedient, onEditExpedient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [areaDependenciaFilter, setAreaDependenciaFilter] = useState('');
  const [filteredExpedients, setFilteredExpedients] = useState(expedients);

  const applyFilters = () => {
    let tempExpedients = expedients;

    // Filtrar por término de búsqueda (Folio o Nombre)
    if (searchTerm) {
      tempExpedients = tempExpedients.filter(
        (exp) =>
          exp.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.primerApellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.segundoApellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.id.toString().includes(searchTerm) // Suponiendo que el ID es el folio
      );
    }

    // Filtrar por rango de fechas
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      tempExpedients = tempExpedients.filter((exp) => {
        const createdAtDate = new Date(exp.createdAt.split('/').reverse().join('-')); // Convertir DD/MM/YYYY a YYYY-MM-DD
        return createdAtDate >= start && createdAtDate <= end;
      });
    }

    // Filtrar por área o dependencia
    if (areaDependenciaFilter) {
      tempExpedients = tempExpedients.filter(
        (exp) => exp.areaDependencia.toLowerCase() === areaDependenciaFilter.toLowerCase()
      );
    }

    setFilteredExpedients(tempExpedients);
  };

  const inputClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent text-lg placeholder-gray-500";
  const selectClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent text-lg text-gray-500";

  return (
    <div className="flex flex-col items-center flex-grow bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-6xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Buscar Expedientes</h2>

        {/* Sección de Buscador */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Buscador</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="col-span-full lg:col-span-2">
              <input
                type="text"
                placeholder="Buscar por Folio o Nombre"
                className={inputClass}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Desde Fecha:</label>
              <input
                type="date"
                className={inputClass}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Hasta Fecha:</label>
              <input
                type="date"
                className={inputClass}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Área o Dependencia:</label>
              <select
                className={selectClass}
                value={areaDependenciaFilter}
                onChange={(e) => setAreaDependenciaFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="profesor">Profesor</option>
                <option value="administrativo">Administrativo</option>
              </select>
            </div>
            <div className="col-span-full flex justify-end">
              <button
                onClick={applyFilters}
                className="bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Resultados */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Resultados</h3>
          {filteredExpedients.length === 0 ? (
            <p className="text-center text-gray-600 text-xl">
              ¡No se encontraron expedientes con los filtros aplicados!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Folio</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Nombre(s)</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Apellido Paterno</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Apellido Materno</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Área o Dependencia</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Incapacidad</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpedients.map((exp) => (
                    <tr key={exp.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800">{exp.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{exp.nombres}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{exp.primerApellido}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{exp.segundoApellido}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 capitalize">{exp.areaDependencia}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{exp.incapacidad || 'N/A'}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onSelectExpedient(exp)}
                          className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition-all duration-300 shadow-md"
                        >
                          Ver y Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpedientSearch;

// DONE