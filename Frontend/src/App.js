import React, { useState, useEffect } from 'react';
import AuthLogin from './components/AuthLogin';
import LayoutHeader from './components/LayoutHeader';
import HomeDashboard from './components/HomeDashboard';
import ExpedientAdd from './components/ExpedientAdd';
import ExpedientEdit from './components/ExpedientEdit';
import ExpedientSearch from './components/ExpedientSearch';
import ExpedientView from './components/ExpedientView';
import { useLocalStorage } from './utils/storage';
import { defaultExpedients } from './mock/expedients';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 'home');
  const [expedients, setExpedients] = useLocalStorage('expedients', defaultExpedients);
  const [selectedExpedient, setSelectedExpedient] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentPage('login');
    }
  }, [isLoggedIn, setCurrentPage]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    if (page === 'login') {
      setIsLoggedIn(false);
      setCurrentPage('login');
      setSelectedExpedient(null);
    } else {
      setCurrentPage(page);
      setSelectedExpedient(null);
    }
  };

  const handleAddExpedient = (newExpedient) => {
    setExpedients((prevExpedients) => [...prevExpedients, newExpedient]);
    setCurrentPage('search');
  };

  const handleSelectExpedient = (expedient) => {
    setSelectedExpedient(expedient);
    setCurrentPage('view');
  };

  const handleEditExpedient = (expedient) => {
    setSelectedExpedient(expedient);
    setCurrentPage('edit');
  };

  const handleSaveExpedient = (updatedExpedient) => {
    setExpedients((prevExpedients) =>
      prevExpedients.map((exp) =>
        exp.id === updatedExpedient.id ? updatedExpedient : exp
      )
    );
    setSelectedExpedient(updatedExpedient);
    setCurrentPage('view');
  };

  const handleCancelEdit = () => {
    setCurrentPage('search');
    setSelectedExpedient(null);
  };

  const handleDeleteExpedient = (idToDelete) => {
    setExpedients((prevExpedients) =>
      prevExpedients.filter((exp) => exp.id !== idToDelete)
    );
    setSelectedExpedient(null);
    setCurrentPage('search');
  };

  if (!isLoggedIn) {
    return <AuthLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LayoutHeader onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {currentPage === 'home' && <HomeDashboard onNavigate={handleNavigate} />}
        {currentPage === 'add' && <ExpedientAdd onAddExpedient={handleAddExpedient} />}
        {currentPage === 'search' && (
          <ExpedientSearch
            expedients={expedients}
            onSelectExpedient={handleSelectExpedient}
            onEditExpedient={handleEditExpedient}
          />
        )}
        {currentPage === 'edit' && selectedExpedient && (
          <ExpedientEdit
            expedient={selectedExpedient}
            onSaveExpedient={handleSaveExpedient}
            onCancelEdit={handleCancelEdit}
          />
        )}
        {currentPage === 'view' && selectedExpedient && (
          <ExpedientView
            expedient={selectedExpedient}
            onBackToList={() => setCurrentPage('search')}
            onEditExpedient={handleEditExpedient}
            onDeleteExpedient={handleDeleteExpedient}
          />
        )}
      </main>
      <footer className="w-full bg-white shadow-md py-3 px-6 flex justify-center items-center border-t border-gray-200">
        <p className="text-gray-500 text-sm">© 2025 CAPCO, Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default App;

// DONE