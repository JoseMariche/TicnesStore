/**
 * Página do dashboard do usuário
 * Exibe apps baixados e avaliações do usuário
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppList } from '../components/AppList';
import { Download, Star, User } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { currentUser, apps } = useApp();
  const navigate = useNavigate();

  // Redirecionar se não estiver logado
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  // Apps baixados pelo usuário
  const downloadedApps = apps.filter((app) =>
    currentUser.downloadedApps.includes(app.id)
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header do Dashboard */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Olá, {currentUser.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <Download className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {downloadedApps.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Apps Baixados
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentUser.reviews.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avaliações Feitas
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <User className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Date().getFullYear()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Membro desde
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Apps Baixados */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Download className="w-6 h-6" />
              Meus Apps
            </h2>
            <Link
              to="/search"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Explorar mais apps
            </Link>
          </div>
          {downloadedApps.length > 0 ? (
            <AppList apps={downloadedApps} />
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Você ainda não baixou nenhum app
              </p>
              <Link
                to="/search"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Explorar Apps
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
