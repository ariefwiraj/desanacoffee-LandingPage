import type { ApiResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const TOKEN_KEY = 'desana_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  if (res.status === 401) {
    clearToken();
    return { error: 'Unauthorized' };
  }

  const json = await res.json();

  if (!res.ok) {
    return { error: json.error || `Request failed (${res.status})` };
  }

  // If backend wraps in { data: ... }, use it. Otherwise, return the whole json.
  return { data: json.data !== undefined ? json.data : json };
}

export async function apiGet<T>(path: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: { ...authHeaders() },
    });
    return handleResponse<T>(res);
  } catch {
    return { error: 'Network error' };
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  } catch {
    return { error: 'Network error' };
  }
}

export async function apiPut<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  } catch {
    return { error: 'Network error' };
  }
}

export async function apiDelete<T>(path: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    return handleResponse<T>(res);
  } catch {
    return { error: 'Network error' };
  }
}

export async function apiPostForm<T>(path: string, formData: FormData): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { ...authHeaders() },
      body: formData,
    });
    return handleResponse<T>(res);
  } catch {
    return { error: 'Network error' };
  }
}

export async function apiPutForm<T>(path: string, formData: FormData): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: { ...authHeaders() },
      body: formData,
    });
    return handleResponse<T>(res);
  } catch {
    return { error: 'Network error' };
  }
}
