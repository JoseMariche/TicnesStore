/**
 * Página de busca e filtros
 * Permite pesquisar e filtrar apps por categoria, rating, etc.
 */

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppList } from '../components/AppList';
import { SearchBar } from '../components/SearchBar';
import { AppCategory, SearchFilters } from '../types';
import { Filter, X } from 'lucide-react';

export const Search: React.FC = () => {
  const { filteredApps, filters, setFilters } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = React.useState(false);

  // Sincronizar URL params com filtros
  React.useEffect(() => {
    const category = searchParams.get('category') as AppCategory | null;
    const query = searchParams.get('query') || '';
    
    if (category || query) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        query,
        category: category || undefined,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (category: AppCategory | undefined) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category,
    }));
    
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    setFilters((prevFilters) => ({ ...prevFilters, sortBy }));
  };

  const handleRatingFilter = (minRating: number | undefined) => {
    setFilters((prevFilters) => ({ ...prevFilters, minRating }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      sortBy: 'popular',
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header da busca */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Buscar Apps
          </h1>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <SearchBar />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Painel de Filtros */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Filtros
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Limpar filtros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) =>
                    handleCategoryChange(
                      e.target.value ? (e.target.value as AppCategory) : undefined
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todas</option>
                  {Object.values(AppCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Mínimo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avaliação Mínima
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) =>
                    handleRatingFilter(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Qualquer</option>
                  <option value="4">4+ estrelas</option>
                  <option value="3">3+ estrelas</option>
                  <option value="2">2+ estrelas</option>
                </select>
              </div>

              {/* Ordenação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ordenar por
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleSortChange(e.target.value as SearchFilters['sortBy'])
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="popular">Mais Popular</option>
                  <option value="rating">Melhor Avaliado</option>
                  <option value="downloads">Mais Baixados</option>
                  <option value="newest">Mais Recente</option>
                </select>
              </div>
            </div>

            {/* Filtros ativos */}
            {(filters.category || filters.minRating) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.category && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                    {filters.category}
                    <button
                      onClick={() => handleCategoryChange(undefined)}
                      className="hover:text-primary-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {filters.minRating && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                    {filters.minRating}+ estrelas
                    <button
                      onClick={() => handleRatingFilter(undefined)}
                      className="hover:text-primary-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Resultados */}
        <div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''} encontrado
            {filteredApps.length !== 1 ? 's' : ''}
          </p>
          <AppList apps={filteredApps} />
        </div>
      </div>
    </div>
  );
};
