
/**
 * Simple obfuscation utility to protect data in LocalStorage.
 * Not for production military-grade security, but enough to hide plain text.
 */

const SALT = "LUMINA_SECURE_2024";

export const encryptData = (data: any): string => {
  const jsonStr = JSON.stringify(data);
  const shifted = jsonStr.split('').map((char, i) => {
    return String.fromCharCode(char.charCodeAt(0) + (SALT.charCodeAt(i % SALT.length) % 10));
  }).join('');
  return btoa(shifted);
};

export const decryptData = (encrypted: string): any => {
  try {
    const shifted = atob(encrypted);
    const original = shifted.split('').map((char, i) => {
      return String.fromCharCode(char.charCodeAt(0) - (SALT.charCodeAt(i % SALT.length) % 10));
    }).join('');
    return JSON.parse(original);
  } catch (e) {
    console.error("Data integrity check failed:", e);
    return null;
  }
};
