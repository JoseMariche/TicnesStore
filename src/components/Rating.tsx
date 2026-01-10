/**
 * Componente de avaliação por estrelas
 * Exibe estrelas preenchidas/vazias baseado na nota
 */

import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number; // Nota de 0 a 5
  maxRating?: number; // Máximo de estrelas (padrão: 5)
  showNumber?: boolean; // Se deve mostrar o número ao lado
  size?: 'sm' | 'md' | 'lg'; // Tamanho das estrelas
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  showNumber = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Estrelas preenchidas
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={i}
        className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
      />
    );
  }

  // Meia estrela (se necessário)
  if (hasHalfStar && fullStars < maxRating) {
    stars.push(
      <div key="half" className="relative">
        <Star className={`${sizeClasses[size]} text-gray-300`} />
        <Star
          className={`${sizeClasses[size]} absolute top-0 left-0 fill-yellow-400 text-yellow-400 overflow-hidden`}
          style={{ width: '50%' }}
        />
      </div>
    );
  }

  // Estrelas vazias
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className={`${sizeClasses[size]} text-gray-300`}
      />
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showNumber && (
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
