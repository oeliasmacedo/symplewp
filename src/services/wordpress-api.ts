import axios from 'axios';
import { WordPressSite, WordPressPost, WordPressUser } from '../types/wordpress';
import { ApiResponse, PaginatedResponse, PostSearchParams, UserSearchParams } from '../types/api';

const createApiClient = (site: WordPressSite) => {
  const client = axios.create({
    baseURL: site.apiUrl,
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para adicionar token de autenticação
  client.interceptors.request.use((config) => {
    if (site.credentials?.clientId && site.credentials?.clientSecret) {
      const token = btoa(`${site.credentials.clientId}:${site.credentials.clientSecret}`);
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  });

  return client;
};

export class WordPressApiService {
  private client;

  constructor(site: WordPressSite) {
    this.client = createApiClient(site);
  }

  // Posts
  async getPosts(params?: PostSearchParams): Promise<PaginatedResponse<WordPressPost>> {
    const response = await this.client.get('/wp/v2/posts', { params });
    return {
      data: response.data,
      total: Number(response.headers['x-wp-total']),
      totalPages: Number(response.headers['x-wp-totalpages']),
      currentPage: params?.page || 1,
      perPage: params?.perPage || 10,
    };
  }

  async getPost(id: number): Promise<ApiResponse<WordPressPost>> {
    const response = await this.client.get(`/wp/v2/posts/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Users
  async getUsers(params?: UserSearchParams): Promise<PaginatedResponse<WordPressUser>> {
    const response = await this.client.get('/wp/v2/users', { params });
    return {
      data: response.data,
      total: Number(response.headers['x-wp-total']),
      totalPages: Number(response.headers['x-wp-totalpages']),
      currentPage: params?.page || 1,
      perPage: params?.perPage || 10,
    };
  }

  async getUser(id: number): Promise<ApiResponse<WordPressUser>> {
    const response = await this.client.get(`/wp/v2/users/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Site Health
  async getSiteHealth(): Promise<ApiResponse<any>> {
    const response = await this.client.get('/wp-site-health/v1/tests/background-updates');
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Error handling
  private handleError(error: any) {
    if (error.response) {
      // Erro da API
      throw {
        status: error.response.status,
        code: error.response.data.code || 'unknown_error',
        message: error.response.data.message || 'Erro desconhecido',
        details: error.response.data,
      };
    } else if (error.request) {
      // Erro de rede
      throw {
        status: 0,
        code: 'network_error',
        message: 'Erro de conexão com o servidor',
      };
    } else {
      // Outros erros
      throw {
        status: 500,
        code: 'unknown_error',
        message: error.message || 'Erro desconhecido',
      };
    }
  }
} 