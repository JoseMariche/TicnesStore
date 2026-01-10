/**
 * Componente principal da aplicação
 * Configura as rotas e estrutura geral da App Store
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { AppDetails } from './pages/AppDetails';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/app/:id" element={<AppDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
