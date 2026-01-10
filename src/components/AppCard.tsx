/**
 * Componente de card de aplicativo
 * Exibe informações resumidas de um app em formato de card
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Download, DollarSign } from 'lucide-react';
import { App } from '../types';
import { Rating } from './Rating';

interface AppCardProps {
  app: App;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <Link
      to={`/app/${app.id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Imagem do ícone */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 p-6">
        <img
          src={app.icon}
          alt={app.name}
          className="w-20 h-20 mx-auto rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
          {app.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {app.developer}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
          {app.description}
        </p>

        {/* Rating e downloads */}
        <div className="flex items-center justify-between mb-3">
          <Rating rating={app.rating} showNumber size="sm" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {(app.downloads / 1000000).toFixed(1)}M downloads
          </span>
        </div>

        {/* Preço e categoria */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
            {app.category}
          </span>
          <div className="flex items-center gap-1">
            {app.price === 0 ? (
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Grátis
              </span>
            ) : (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {app.price.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
