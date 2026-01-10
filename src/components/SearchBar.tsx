/**
 * Componente de barra de pesquisa
 * Permite buscar apps por nome, desenvolvedor ou descrição
 */

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchBar: React.FC = () => {
  const { filters, setFilters } = useApp();
  const [localQuery, setLocalQuery] = useState(filters.query);

  // Debounce da pesquisa
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prevFilters) => ({ ...prevFilters, query: localQuery }));
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setFilters]);

  const handleClear = () => {
    setLocalQuery('');
    setFilters((prevFilters) => ({ ...prevFilters, query: '' }));
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar apps..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
