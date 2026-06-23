const SESSION_KEY = 'secureSwapSession';
const TIMEZONE_KEY = 'userTimezone';

const isBrowser = typeof window !== 'undefined';

const storage = {
  local: () => (isBrowser ? window.localStorage : null),
  session: () => (isBrowser ? window.sessionStorage : null),
};

const parseSession = (rawValue) => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!parsed?.email || !parsed?.expiresAt) {
      return null;
    }

    if (Date.now() > parsed.expiresAt) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const clearStorageSession = (targetStorage) => {
  targetStorage?.removeItem(SESSION_KEY);
};

export const getSession = () => {
  const sessionSession = parseSession(storage.session()?.getItem(SESSION_KEY));
  if (sessionSession) {
    return sessionSession;
  }

  const localSession = parseSession(storage.local()?.getItem(SESSION_KEY));
  if (localSession) {
    return localSession;
  }

  clearSession();
  return null;
};

export const isAuthenticated = () => Boolean(getSession());

export const createDemoSession = ({ email, provider = 'password', rememberMe = false }) => {
  const nextSession = {
    email,
    provider,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
    mode: 'demo',
  };

  const targetStorage = rememberMe ? storage.local() : storage.session();
  const otherStorage = rememberMe ? storage.session() : storage.local();

  otherStorage?.removeItem(SESSION_KEY);
  targetStorage?.setItem(SESSION_KEY, JSON.stringify(nextSession));

  return nextSession;
};

export const clearSession = () => {
  clearStorageSession(storage.local());
  clearStorageSession(storage.session());
};

export const saveUserTimezone = (timezone) => {
  if (timezone) {
    storage.local()?.setItem(TIMEZONE_KEY, timezone);
  }
};

export const getUserTimezone = () => storage.local()?.getItem(TIMEZONE_KEY) || '';
