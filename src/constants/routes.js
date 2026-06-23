/**
 * Application route constants.
 * Single source of truth for all route paths — avoids magic strings.
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/user-login',
  REGISTER: '/user-registration',
  DASHBOARD: '/exchange-dashboard',
  CREATE_EXCHANGE: '/create-exchange',
  EXCHANGE_DETAILS: '/exchange-details',
  EXCHANGE_MATCHING: '/exchange-matching',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
  NOT_FOUND: '*',
};

export default ROUTES;
