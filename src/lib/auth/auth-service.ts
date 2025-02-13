type LoginCredentials = {
  email: string;
  password: string;
};

export const authService = {
  async getCsrfToken() {
    // Get CSRF cookie from Laravel Sanctum
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include' // Important: needed to include cookies
    });
  },

  async login(credentials: LoginCredentials) {
    // First get CSRF token
    await this.getCsrfToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      credentials: 'include', // Important: needed to include cookies
      headers: {
        'Content-Type': 'application/json'
        // 'Accept': 'application/json',
        // Get the XSRF-TOKEN cookie and send it as XSRF-TOKEN header
        // 'XSRF-TOKEN': decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || '')
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    return data;
  },

  async logout() {
    await this.getCsrfToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'XSRF-TOKEN': decodeURIComponent(
          document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1] || ''
        )
      }
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    localStorage.removeItem('token');
  }
};
