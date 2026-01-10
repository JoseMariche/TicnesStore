/**
 * Componente de lista de aplicativos
 * Renderiza uma grade de cards de apps
 */

import React from 'react';
import { App } from '../types';
import { AppCard } from './AppCard';

interface AppListProps {
  apps: App[];
  title?: string;
}

export const AppList: React.FC<AppListProps> = ({ apps, title }) => {
  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Nenhum aplicativo encontrado
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};
