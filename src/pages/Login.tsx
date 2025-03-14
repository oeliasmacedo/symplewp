import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
          WP Simplify Dashboard
        </h1>
        <LoginForm />
      </div>
    </div>
  );
} 