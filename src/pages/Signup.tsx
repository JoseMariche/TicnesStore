/**
 * Página de cadastro
 * Renderiza o formulário de cadastro
 */

import React from 'react';
import { SignupForm } from '../components/SignupForm';

export const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <SignupForm />
    </div>
  );
};
