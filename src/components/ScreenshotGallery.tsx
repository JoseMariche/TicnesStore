/**
 * Componente de galeria de screenshots
 * Exibe screenshots de um app em formato de carrossel
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Screenshot } from '../types';

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ screenshots }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (screenshots.length === 0) {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Nenhuma screenshot disponível</p>
      </div>
    );
  }

  const nextScreenshot = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="relative">
      {/* Screenshot Principal */}
      <div className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
        <img
          src={screenshots[currentIndex].url}
          alt={screenshots[currentIndex].alt}
          className="w-full h-auto object-cover"
        />
        
        {/* Navegação */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prevScreenshot}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Screenshot anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextScreenshot}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Próxima screenshot"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <img
                src={screenshot.url}
                alt={screenshot.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Indicador */}
      {screenshots.length > 1 && (
        <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {screenshots.length}
        </div>
      )}
    </div>
  );
};
