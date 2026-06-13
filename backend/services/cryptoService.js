const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

const getSecretKey = () => {
  const secret = process.env.CRYPTO_SECRET || 'default_secret_key_for_facebook_poster_32';
  return crypto.createHash('sha256').update(secret).digest();
};

const encrypt = (text) => {
  if (!text) return text;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

const decrypt = (text) => {
  if (!text) return text;
  try {
    const parts = text.split(':');
    if (parts.length !== 2) return text; // Reroutes if not formatted properly
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption failed:', err.message);
    return text; // Fallback
  }
};

module.exports = { encrypt, decrypt };
