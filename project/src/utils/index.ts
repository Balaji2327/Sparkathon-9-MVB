// Generate a unique ID for a new link
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Generate a short code for URLs
export const generateShortCode = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Validate URL format
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Add http:// prefix if missing
export const ensureHttps = (url: string): string => {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Extract domain from URL for display
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(ensureHttps(url));
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
};