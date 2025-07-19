export const APP_CONSTANTS = {
  APP_NAME: 'Admin Ventas',
  CURRENCY: 'BOB',
  CART_STORAGE_KEY: 'carrito-storage',
  AUTH_STORAGE_KEY: 'auth-storage'
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PAYMENT: '/pago',
  ABOUT: '/about'
} as const; 