/**
 * Tipos TypeScript para a App Store
 * Define as interfaces principais usadas em toda a aplicação
 */

// Enum para categorias de apps
export enum AppCategory {
  SOCIAL = 'Social',
  PRODUCTIVITY = 'Produtividade',
  GAMES = 'Jogos',
  EDUCATION = 'Educação',
  ENTERTAINMENT = 'Entretenimento',
  PHOTOGRAPHY = 'Fotografia',
  MUSIC = 'Música',
  HEALTH = 'Saúde',
  FINANCE = 'Finanças',
  TRAVEL = 'Viagem',
}

// Interface para avaliações de apps
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 estrelas
  comment: string;
  date: string;
}

// Interface para screenshots de apps
export interface Screenshot {
  id: string;
  url: string;
  alt: string;
}

// Interface principal para um aplicativo
export interface App {
  id: string;
  name: string;
  developer: string;
  description: string;
  longDescription: string;
  category: AppCategory;
  icon: string;
  screenshots: Screenshot[];
  price: number; // 0 para apps gratuitos
  version: string;
  size: string; // Ex: "50 MB"
  downloads: number;
  rating: number; // Média de 1-5
  reviews: Review[];
  featured: boolean; // Se o app está em destaque
  releaseDate: string;
}

// Interface para usuário
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  downloadedApps: string[]; // IDs dos apps baixados
  reviews: string[]; // IDs das reviews feitas pelo usuário
}

// Tipo para filtros de busca
export interface SearchFilters {
  query: string;
  category?: AppCategory;
  sortBy: 'popular' | 'rating' | 'downloads' | 'newest';
  minRating?: number;
}
