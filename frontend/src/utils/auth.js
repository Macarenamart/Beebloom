

const STORAGE_KEY = "beebloomAuth";


export function getStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}


export function isAuthenticated() {
  const stored = getStoredAuth();
  return Boolean(stored?.token);
}


const ADMIN_EMAIL = "admin@beebloom.com";

export function isAdmin() {
  const stored = getStoredAuth();
  const email = stored?.user?.email;
  return email === ADMIN_EMAIL;
}