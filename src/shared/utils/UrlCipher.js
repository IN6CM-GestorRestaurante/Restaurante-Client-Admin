/**
 * UrlCipher — Ofuscación reversible de IDs para URLs
 * 
 * Encodes MongoDB ObjectIds (24-char hex) and PostgreSQL GUIDs into 
 * URL-safe opaque strings. NOT cryptographic — purely for obfuscation
 * to prevent casual ID enumeration in the browser address bar.
 * 
 * Usage:
 *   import { maskId, unmaskId } from '@/shared/utils/UrlCipher';
 *   const masked = maskId('507f1f77bcf86cd799439011'); // → "NTA3ZjFmNz..."
 *   const original = unmaskId(masked);                  // → "507f1f77bcf86cd799439011"
 */

const SALT = 'R3stAur4nt3'; // Prefix salt for basic obfuscation

/**
 * Masks a database ID into a URL-safe opaque string.
 * @param {string} id - The raw database ID (MongoDB ObjectId or PostgreSQL GUID)
 * @returns {string} URL-safe obfuscated string
 */
export const maskId = (id) => {
    if (!id) return '';
    const salted = SALT + ':' + id;
    // btoa is available in all modern browsers
    return btoa(salted)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

/**
 * Unmasks a URL-safe opaque string back into the original database ID.
 * @param {string} masked - The obfuscated string from maskId()
 * @returns {string} The original database ID
 */
export const unmaskId = (masked) => {
    if (!masked) return '';
    try {
        // Restore base64 padding
        const padded = masked.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = atob(padded);
        const prefix = SALT + ':';
        if (!decoded.startsWith(prefix)) {
            console.warn('[UrlCipher] Invalid masked ID — salt mismatch');
            return masked; // Return as-is if salt doesn't match (fallback)
        }
        return decoded.slice(prefix.length);
    } catch {
        console.warn('[UrlCipher] Failed to decode masked ID');
        return masked; // Return as-is on decode failure
    }
};

/**
 * Masks an ID and appends it to a base path.
 * @param {string} basePath - The base path (e.g., "/dashboard/companies/")
 * @param {string} id - The raw database ID
 * @returns {string} The complete URL with masked ID
 */
export const getMaskedUrl = (basePath, id) => {
    if (!id) return basePath;
    const separator = basePath.endsWith('/') ? '' : '/';
    return `${basePath}${separator}${maskId(id)}`;
};
