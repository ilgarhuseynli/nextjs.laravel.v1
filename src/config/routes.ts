export const API_ROUTES = {
  auth: {
    csrf: '/sanctum/csrf-cookie',
    login: '/login',
    logout: '/logout',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    verifyEmail: '/verify-email'
  },
  twoFactor: {
    enable: '/2fa/enable',
    verify: '/2fa/verify',
    validate: '/2fa/validate',
    recoveryCodes: '/2fa/recovery-codes'
  },
  devices: {
    list: '/devices',
    logout: (deviceId: string) => `/devices/${deviceId}/logout`,
    logoutAll: '/devices/logout-all'
  }
} as const;

export const APP_ROUTES = {
  auth: {
    login: '/',
    register: '/signup'
  },
  dashboard: {
    root: '/dashboard',
    overview: '/dashboard/overview',
    profile: '/dashboard/profile',
    products: '/dashboard/products'
  }
} as const;
