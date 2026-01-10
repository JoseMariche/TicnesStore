/**
 * Página inicial da App Store
 * Exibe apps em destaque, categorias e apps populares
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppList } from '../components/AppList';
import { AppCategory } from '../types';
import { TrendingUp, Star, Download } from 'lucide-react';

export const Home: React.FC = () => {
  const { apps } = useApp();

  // Apps em destaque
  const featuredApps = apps.filter((app) => app.featured);

  // Apps mais baixados
  const popularApps = [...apps]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8);

  // Apps melhor avaliados
  const topRatedApps = [...apps]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  // Agrupar apps por categoria
  const appsByCategory = Object.values(AppCategory).map((category) => ({
    category,
    apps: apps.filter((app) => app.category === category).slice(0, 4),
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Descubra os Melhores Apps
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Milhares de aplicativos esperando por você. Encontre o app perfeito para suas necessidades.
            </p>
            <Link
              to="/search"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              Explorar Apps
            </Link>
          </div>
        </div>
      </section>

      {/* Apps em Destaque */}
      {featuredApps.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Apps em Destaque
              </h2>
            </div>
            <AppList apps={featuredApps} />
          </div>
        </section>
      )}

      {/* Apps Mais Baixados */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mais Baixados
            </h2>
          </div>
          <AppList apps={popularApps} />
        </div>
      </section>

      {/* Apps Melhor Avaliados */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Melhor Avaliados
            </h2>
          </div>
          <AppList apps={topRatedApps} />
        </div>
      </section>

      {/* Apps por Categoria */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Explore por Categoria
          </h2>
          <div className="space-y-12">
            {appsByCategory.map(
              ({ category, apps: categoryApps }) =>
                categoryApps.length > 0 && (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {category}
                      </h3>
                      <Link
                        to={`/search?category=${category}`}
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Ver todos
                      </Link>
                    </div>
                    <AppList apps={categoryApps} />
                  </div>
                )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
