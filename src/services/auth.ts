import { WordPressUser } from '../types/wordpress';

interface AuthResponse {
  token: string;
  user: WordPressUser;
}

interface LoginCredentials {
  username: string;
  password: string;
  siteUrl: string;
}

class AuthService {
  private static TOKEN_KEY = 'wp_auth_token';
  private static USER_KEY = 'wp_auth_user';

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { siteUrl, username, password } = credentials;
    const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
    
    try {
      // Primeiro, tentamos autenticação JWT
      const jwtResponse = await fetch(`${baseUrl}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (jwtResponse.ok) {
        const data = await jwtResponse.json();
        const token = data.token;

        // Buscar informações do usuário
        const userResponse = await fetch(`${baseUrl}/wp-json/wp/v2/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const user = await userResponse.json();
          this.setSession({ token, user });
          return { token, user };
        }
      }

      // Se JWT falhar, tentar autenticação básica
      const basicAuth = btoa(`${username}:${password}`);
      const basicResponse = await fetch(`${baseUrl}/wp-json/wp/v2/users/me`, {
        headers: {
          'Authorization': `Basic ${basicAuth}`,
        },
      });

      if (basicResponse.ok) {
        const user = await basicResponse.json();
        this.setSession({ token: basicAuth, user });
        return { token: basicAuth, user };
      }

      throw new Error('Credenciais inválidas');
    } catch (error) {
      throw new Error('Erro ao realizar login: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static setSession(auth: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, auth.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(auth.user));
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getUser(): WordPressUser | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static async validateToken(siteUrl: string, token: string): Promise<boolean> {
    const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
    
    try {
      const response = await fetch(`${baseUrl}/wp-json/wp/v2/users/me`, {
        headers: {
          'Authorization': token.startsWith('Bearer') ? token : `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}

export default AuthService; 