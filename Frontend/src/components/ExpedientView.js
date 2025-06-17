import React, { useState, useEffect } from 'react';

const ExpedientView = ({ expedient, onBackToList, onEditExpedient, onDeleteExpedient }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showDeleteConfirm) {
      setConfirmInput('');
      setMessage('');
    }
  }, [showDeleteConfirm]);

  if (!expedient) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-50 p-6">
        <p className="text-xl text-gray-600">¡Ups! No hay expediente seleccionado. ¡Regresa y elige uno!</p>
      </div>
    );
  }

  const handleConfirmDelete = () => {
    if (confirmInput === 'CONFIRMAR') {
      onDeleteExpedient(expedient.id);
      setShowDeleteConfirm(false);
      setMessage('¡Expediente borrado con éxito! ¡Adiós, vaquero!');
      setTimeout(() => {
        setMessage('');
        onBackToList();
      }, 2000);
    } else {
      setMessage('Texto incorrecto. Escribe "CONFIRMAR" para borrar. ¡No te equivoques!');
    }
  };

  const inputClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent text-lg placeholder-gray-500";
  const selectClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent text-lg text-gray-500";
  const textareaClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent resize-none text-lg placeholder-gray-500";

  return (
    <div className="flex flex-col items-center flex-grow bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ver y Editar Expediente</h2>
        {message && (
          <p className={`text-center mb-4 ${message.includes('éxito') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {/* Datos Personales */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Datos Personales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" placeholder="Nombre(s)" className={inputClass} value={expedient.nombres || ''} readOnly />
            <input type="text" placeholder="Primer Apellido" className={inputClass} value={expedient.primerApellido || ''} readOnly />
            <input type="text" placeholder="Segundo Apellido" className={inputClass} value={expedient.segundoApellido || ''} readOnly />
          </div>
        </div>

        {/* Datos Laborales */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Datos Laborales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" placeholder="Área o dependencia asignada" className={inputClass} value={expedient.areaDependencia || ''} readOnly />
            <input type="text" placeholder="Función ejercida" className={inputClass} value={expedient.funcionEjercida || ''} readOnly />
            <input type="text" placeholder="Compensado o de base" className={inputClass} value={expedient.tipoContrato || ''} readOnly />
          </div>
        </div>

        {/* Datos Médicos */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Datos Médicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Acta de hechos" className={inputClass} value={expedient.actaHechos || ''} readOnly />
            <input type="text" placeholder="RT 01" className={inputClass} value={expedient.rt01 || ''} readOnly />
            <input type="text" placeholder="RT 02" className={inputClass} value={expedient.rt02 || ''} readOnly />
            <input type="text" placeholder="RT 03" className={inputClass} value={expedient.rt03 || ''} readOnly />
            <textarea placeholder="Notas médicas" rows="3" className={`${textareaClass} col-span-full`} value={expedient.notasMedicas || ''} readOnly></textarea>
            <input type="text" placeholder="Incapacidad" className={inputClass} value={expedient.incapacidad || ''} readOnly />
          </div>
        </div>

        {/* Documentos */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Documentos</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md">
              Descargar archivo SNTE (PDF)
            </button>
            <button className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md">
              Descargar archivos adicionales (PDF)
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => onEditExpedient(expedient)}
            className="bg-yellow-500 text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Editar
          </button>
          <button
            onClick={onBackToList}
            className="bg-gray-300 text-gray-800 py-3 px-6 rounded-md text-xl font-semibold hover:bg-gray-400 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Volver a Búsqueda
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500 text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Borrar Expediente
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Seguro que deseas borrar el expediente?</h3>
            <p className="text-gray-600 mb-6">Si es así, coloca en el campo: <span className="font-bold text-red-500">CONFIRMAR</span></p>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 mb-4 text-lg"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder="Escribe CONFIRMAR"
            />
            {message && <p className="text-red-500 mb-4 text-base">{message}</p>}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 text-gray-800 py-2 px-5 rounded-md text-lg font-semibold hover:bg-gray-400 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white py-2 px-5 rounded-md text-lg font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Confirmar Borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpedientView;