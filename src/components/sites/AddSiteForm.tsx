import React, { useState } from 'react';
import { useWordPress } from '../../contexts/WordPressContext';
import AuthService from '../../services/auth';

interface AddSiteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddSiteForm({ onSuccess, onCancel }: AddSiteFormProps) {
  const { addSite } = useWordPress();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Primeiro, tenta autenticar
      const auth = await AuthService.login({
        siteUrl: formData.url,
        username: formData.username,
        password: formData.password,
      });

      // Se autenticação bem sucedida, adiciona o site
      await addSite({
        name: formData.name,
        url: formData.url,
        token: auth.token,
        user: auth.user,
      });

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar site');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Site
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Meu Site WordPress"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          URL do Site
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="https://seu-site.com"
          value={formData.url}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Usuário
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Adicionando...' : 'Adicionar Site'}
        </button>
      </div>
    </form>
  );
} 