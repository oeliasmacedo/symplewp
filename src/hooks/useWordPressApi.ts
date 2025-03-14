import { useEffect, useState } from 'react';
import { WordPressApiService } from '../services/wordpress-api';
import { useWordPress } from '../contexts/WordPressContext';
import { ApiResponse, PaginatedResponse } from '../types/api';

export function useWordPressApi<T>() {
  const { currentSite } = useWordPress();
  const [data, setData] = useState<T | null>(null);
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Reset state when site changes
  useEffect(() => {
    setData(null);
    setPaginatedData(null);
    setError(null);
  }, [currentSite]);

  const api = currentSite ? new WordPressApiService(currentSite) : null;

  const fetchData = async <R>(
    apiCall: () => Promise<ApiResponse<R> | PaginatedResponse<R>>,
    isPaginated = false
  ) => {
    if (!api) {
      setError(new Error('Nenhum site selecionado'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      
      if ('total' in response) {
        // É uma resposta paginada
        setPaginatedData(response as PaginatedResponse<T>);
        setData(null);
      } else {
        // É uma resposta simples
        setData((response as ApiResponse<T>).data);
        setPaginatedData(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      setData(null);
      setPaginatedData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    paginatedData,
    isLoading,
    error,
    fetchData,
    api,
  };
} 