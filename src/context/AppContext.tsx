/**
 * Context principal para gerenciamento de estado da aplicação
 * Gerencia usuário logado, apps, filtros e operações relacionadas
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { App, User, SearchFilters, AppCategory, Review } from '../types';
import { mockApps, mockUsers } from '../data/mockData';

interface AppContextType {
  // Estado do usuário
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => boolean;
  
  // Apps
  apps: App[];
  getAppById: (id: string) => App | undefined;
  downloadApp: (appId: string) => void;
  
  // Busca e filtros
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  filteredApps: App[];
  
  // Reviews
  addReview: (appId: string, rating: number, comment: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<App[]>(mockApps);
  const [users] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'popular',
  });

  // Função de login (simulada - em produção viria de uma API)
  const login = (email: string, password: string): boolean => {
    const user = users.find((u) => u.email === email);
    if (user && password.length >= 6) {
      // Em produção, validaria a senha corretamente
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Função de logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Função de cadastro (simulada)
  const signup = (name: string, email: string, password: string): boolean => {
    if (password.length < 6) return false;
    
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) return false;

    const newUser: User = {
      id: `user${users.length + 1}`,
      name,
      email,
      downloadedApps: [],
      reviews: [],
    };
    
    // Em produção, salvaria no backend
    setCurrentUser(newUser);
    return true;
  };

  // Buscar app por ID
  const getAppById = (id: string): App | undefined => {
    return apps.find((app) => app.id === id);
  };

  // Baixar app (adiciona aos apps baixados do usuário)
  const downloadApp = (appId: string) => {
    if (!currentUser) return;
    
    if (!currentUser.downloadedApps.includes(appId)) {
      setCurrentUser({
        ...currentUser,
        downloadedApps: [...currentUser.downloadedApps, appId],
      });
    }
  };

  // Adicionar review
  const addReview = (appId: string, rating: number, comment: string) => {
    if (!currentUser) return;

    const app = getAppById(appId);
    if (!app) return;

    const newReview: Review = {
      id: `review${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };

    // Em produção, salvaria no backend
    // Aqui atualizamos o estado local
    setApps((prevApps) =>
      prevApps.map((a) => {
        if (a.id === appId) {
          const updatedReviews = [...a.reviews, newReview];
          const avgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...a,
            reviews: updatedReviews,
            rating: Math.round(avgRating * 10) / 10,
          };
        }
        return a;
      })
    );

    // Atualizar reviews do usuário
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        reviews: [...currentUser.reviews, newReview.id],
      });
    }
  };

  // Filtrar e ordenar apps baseado nos filtros
  const filteredApps = React.useMemo(() => {
    let result = [...apps];

    // Filtro por query (nome)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.description.toLowerCase().includes(query) ||
          app.developer.toLowerCase().includes(query)
      );
    }

    // Filtro por categoria
    if (filters.category) {
      result = result.filter((app) => app.category === filters.category);
    }

    // Filtro por rating mínimo
    if (filters.minRating) {
      result = result.filter((app) => app.rating >= filters.minRating!);
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'popular':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
    }

    return result;
  }, [apps, filters]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
        apps,
        getAppById,
        downloadApp,
        filters,
        setFilters,
        filteredApps,
        addReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};
