/**
 * Página de detalhes do aplicativo
 * Exibe informações completas, screenshots, avaliações e permite baixar/avaliar
 */

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Rating } from '../components/Rating';
import { ScreenshotGallery } from '../components/ScreenshotGallery';
import {
  Download,
  DollarSign,
  Star,
  MessageSquare,
  ArrowLeft,
  Check,
} from 'lucide-react';

export const AppDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAppById, currentUser, downloadApp, addReview } = useApp();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const app = id ? getAppById(id) : undefined;

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            App não encontrado
          </h2>
          <Link
            to="/"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    downloadApp(app.id);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (reviewComment.trim()) {
      addReview(app.id, reviewRating, reviewComment);
      setReviewComment('');
      setReviewRating(5);
      setShowReviewForm(false);
    }
  };

  const isUserDownloaded = currentUser?.downloadedApps.includes(app.id);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Coluna Esquerda - Screenshots */}
          <div>
            <ScreenshotGallery screenshots={app.screenshots} />
          </div>

          {/* Coluna Direita - Informações */}
          <div>
            {/* Header do App */}
            <div className="flex items-start gap-4 mb-6">
              <img
                src={app.icon}
                alt={app.name}
                className="w-24 h-24 rounded-2xl shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {app.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {app.developer}
                </p>
                <div className="flex items-center gap-4">
                  <Rating rating={app.rating} showNumber size="lg" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {app.reviews.length} avaliações
                  </span>
                </div>
              </div>
            </div>

            {/* Botão de Download */}
            <button
              onClick={handleDownload}
              disabled={isDownloaded || isUserDownloaded}
              className={`w-full py-4 rounded-lg font-semibold text-lg mb-6 transition-all ${
                isDownloaded || isUserDownloaded
                  ? 'bg-green-500 text-white'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isDownloaded || isUserDownloaded ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Baixado
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {app.price === 0 ? 'Baixar Grátis' : `Comprar por R$ ${app.price.toFixed(2)}`}
                </span>
              )}
            </button>

            {/* Informações do App */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Informações
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Categoria:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {app.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Versão:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {app.version}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tamanho:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {app.size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Downloads:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {(app.downloads / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lançamento:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {new Date(app.releaseDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre este app
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {app.longDescription}
          </p>
        </div>

        {/* Avaliações */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Avaliações ({app.reviews.length})
            </h2>
            {currentUser && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {showReviewForm ? 'Cancelar' : 'Avaliar'}
              </button>
            )}
          </div>

          {/* Formulário de Avaliação */}
          {showReviewForm && currentUser && (
            <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sua avaliação
                </label>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= reviewRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Escreva sua avaliação..."
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Enviar Avaliação
              </button>
            </form>
          )}

          {/* Lista de Avaliações */}
          <div className="space-y-4">
            {app.reviews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Nenhuma avaliação ainda. Seja o primeiro a avaliar!
              </p>
            ) : (
              app.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.userName}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Rating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
