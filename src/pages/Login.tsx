/**
 * Página de login
 * Renderiza o formulário de login
 */

import React from 'react';
import { LoginForm } from '../components/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <LoginForm />
    </div>
  );
};
