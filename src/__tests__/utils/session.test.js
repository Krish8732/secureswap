import { getSession, createDemoSession, clearSession, saveUserTimezone, getUserTimezone } from '../../utils/session';

describe('Session Management Utilities', () => {
  beforeEach(() => {
    // Clear mock storage
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('should create a demo session in sessionStorage by default', () => {
    const session = createDemoSession({ email: 'test@secureswap.com', rememberMe: false });

    expect(session.email).toBe('test@secureswap.com');
    expect(session.provider).toBe('password');
    expect(session.mode).toBe('demo');
    expect(session.expiresAt).toBeGreaterThan(Date.now());

    const stored = JSON.parse(sessionStorage.getItem('secureSwapSession'));
    expect(stored).toEqual(session);
    expect(localStorage.getItem('secureSwapSession')).toBeNull();
  });

  test('should create a demo session in localStorage if rememberMe is true', () => {
    const session = createDemoSession({ email: 'test@secureswap.com', rememberMe: true });

    const stored = JSON.parse(localStorage.getItem('secureSwapSession'));
    expect(stored).toEqual(session);
    expect(sessionStorage.getItem('secureSwapSession')).toBeNull();
  });

  test('should retrieve an active session', () => {
    const session = createDemoSession({ email: 'active@secureswap.com', rememberMe: true });
    const active = getSession();

    expect(active).toEqual(session);
  });

  test('should clear local sessions', () => {
    createDemoSession({ email: 'clear@secureswap.com', rememberMe: true });
    clearSession();

    expect(getSession()).toBeNull();
    expect(localStorage.getItem('secureSwapSession')).toBeNull();
    expect(sessionStorage.getItem('secureSwapSession')).toBeNull();
  });

  test('should return null for expired sessions', () => {
    const expiredSession = {
      email: 'expired@secureswap.com',
      provider: 'password',
      issuedAt: Date.now() - 9 * 60 * 60 * 1000,
      expiresAt: Date.now() - 1 * 60 * 60 * 1000,
      mode: 'demo',
    };

    localStorage.setItem('secureSwapSession', JSON.stringify(expiredSession));
    expect(getSession()).toBeNull();
  });

  test('should save and get user timezone preference', () => {
    saveUserTimezone('America/New_York');
    expect(getUserTimezone()).toBe('America/New_York');
  });
});
