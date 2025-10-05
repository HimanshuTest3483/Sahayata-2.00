export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(path, { ...options, headers });
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const body = await res.json();
      message = body.error || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
};






