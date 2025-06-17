import React, { useState, useEffect } from 'react';

const ExpedientEdit = ({ expedient, onSaveExpedient, onCancelEdit }) => {
  const [nombres, setNombres] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [areaDependencia, setAreaDependencia] = useState('');
  const [funcionEjercida, setFuncionEjercida] = useState('');
  const [tipoContrato, setTipoContrato] = useState('');
  const [actaHechos, setActaHechos] = useState('');
  const [rt01, setRt01] = useState('');
  const [rt02, setRt02] = useState('');
  const [rt03, setRt03] = useState('');
  const [notasMedicas, setNotasMedicas] = useState('');
  const [incapacidad, setIncapacidad] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (expedient) {
      setNombres(expedient.nombres || '');
      setPrimerApellido(expedient.primerApellido || '');
      setSegundoApellido(expedient.segundoApellido || '');
      setAreaDependencia(expedient.areaDependencia || '');
      setFuncionEjercida(expedient.funcionEjercida || '');
      setTipoContrato(expedient.tipoContrato || '');
      setActaHechos(expedient.actaHechos || '');
      setRt01(expedient.rt01 || '');
      setRt02(expedient.rt02 || '');
      setRt03(expedient.rt03 || '');
      setNotasMedicas(expedient.notasMedicas || '');
      setIncapacidad(expedient.incapacidad || '');
    }
  }, [expedient]);

  const handleSave = () => {
    if (nombres && primerApellido && areaDependencia && funcionEjercida) {
      onSaveExpedient({
        ...expedient,
        nombres,
        primerApellido,
        segundoApellido,
        areaDependencia,
        funcionEjercida,
        tipoContrato,
        actaHechos,
        rt01,
        rt02,
        rt03,
        notasMedicas,
        incapacidad,
      });
      setMessage('¡Expediente actualizado con éxito! ¡Qué eficiencia!');
      setTimeout(() => {
        setMessage('');
        onCancelEdit(); // Volver a la vista del expediente o a la búsqueda
      }, 2000);
    } else {
      setMessage('Por favor, llena los campos obligatorios. ¡No me dejes a medias!');
    }
  };

  const inputClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent text-lg placeholder-gray-500";
  const selectClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent text-lg text-gray-500";
  const textareaClass = "w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-transparent resize-none text-lg placeholder-gray-500";

  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Editar Expediente</h2>
        {message && (
          <p className={`text-center mb-4 ${message.includes('éxito') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {/* Datos Personales */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Datos Personales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" placeholder="Nombre(s)" className={inputClass} value={nombres} onChange={(e) => setNombres(e.target.value)} />
            <input type="text" placeholder="Primer Apellido" className={inputClass} value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
            <input type="text" placeholder="Segundo Apellido" className={inputClass} value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
          </div>
        </div>

        {/* Datos Laborales */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Datos Laborales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" placeholder="Área o dependencia asignada" className={inputClass} value={areaDependencia} onChange={(e) => setAreaDependencia(e.target.value)} />
            <input type="text" placeholder="Función ejercida" className={inputClass} value={funcionEjercida} onChange={(e) => setFuncionEjercida(e.target.value)} />
            <select className={selectClass} value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)}>
              <option value="">Compensado o de base</option>
              <option value="compensado">Compensado</option>
              <option value="base">De Base</option>
            </select>
          </div>
        </div>

        {/* Datos Médicos */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Datos Médicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Acta de hechos" className={inputClass} value={actaHechos} onChange={(e) => setActaHechos(e.target.value)} />
            <input type="text" placeholder="RT 01" className={inputClass} value={rt01} onChange={(e) => setRt01(e.target.value)} />
            <input type="text" placeholder="RT 02" className={inputClass} value={rt02} onChange={(e) => setRt02(e.target.value)} />
            <input type="text" placeholder="RT 03" className={inputClass} value={rt03} onChange={(e) => setRt03(e.target.value)} />
            <textarea placeholder="Notas médicas" rows="3" className={`${textareaClass} col-span-full`} value={notasMedicas} onChange={(e) => setNotasMedicas(e.target.value)}></textarea>
            <input type="text" placeholder="Incapacidad" className={inputClass} value={incapacidad} onChange={(e) => setIncapacidad(e.target.value)} />
          </div>
        </div>

        {/* Documentos (Solo para visualización, no funcional para subir) */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Documentos</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-gray-200 text-gray-700 py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-300 transition-all duration-300 shadow-md">
              Descargar archivo SNTE (PDF)
            </button>
            <button className="bg-gray-200 text-gray-700 py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-300 transition-all duration-300 shadow-md">
              Descargar archivos adicionales (PDF)
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancelEdit}
            className="bg-gray-300 text-gray-800 py-3 px-6 rounded-md text-xl font-semibold hover:bg-gray-400 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpedientEdit;

// DONE