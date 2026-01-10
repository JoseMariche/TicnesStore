/**
 * Componente de rodapé
 * Links de contato, termos e informações legais
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Sobre</h3>
            <p className="text-sm text-gray-400">
              A melhor plataforma para descobrir e baixar aplicativos incríveis.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm hover:text-primary-400 transition-colors">
                  Buscar Apps
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Apps em Destaque
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Reportar Problema
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Licença
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Redes Sociais e Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a
              href="#"
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} App Store. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
