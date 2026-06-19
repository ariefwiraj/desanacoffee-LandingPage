export function getImageUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (path.startsWith('/uploads')) {
    const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'http://localhost:3001';
    return `${baseUrl}${path}`;
  }
  return path;
}
