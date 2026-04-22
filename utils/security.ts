/**
 * Security and validation utilities shared across auth and UI surfaces.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toBase64 = (bytes: Uint8Array): string => {
    let binary = '';
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
};

/**
 * Normalizes email values so identity checks are consistent.
 */
export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(normalizeEmail(email));

/**
 * Enforces a baseline password policy to reduce weak credential risk.
 */
export const validatePasswordStrength = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long.' };
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must include uppercase, lowercase, and a number.' };
    }

    return { valid: true };
};

export const createSalt = (): string => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return toBase64(bytes);
};

/**
 * Browser-native SHA-256 hashing for client-side credential storage hardening.
 */
export const hashPassword = async (password: string, salt: string): Promise<string> => {
    const data = new TextEncoder().encode(`${salt}:${password}`);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return toBase64(new Uint8Array(digest));
};

/**
 * Constant-time comparison avoids simple timing side channels.
 */
export const constantTimeEqual = (left: string, right: string): boolean => {
    if (left.length !== right.length) return false;
    let result = 0;
    for (let i = 0; i < left.length; i += 1) {
        result |= left.charCodeAt(i) ^ right.charCodeAt(i);
    }
    return result === 0;
};

/**
 * Strips control chars and limits payload size before rendering untrusted text.
 */
export const sanitizeTextForDisplay = (value: string, maxLength = 8000): string => {
    return value
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .slice(0, maxLength)
        .trim();
};
