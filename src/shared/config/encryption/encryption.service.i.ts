export interface IEncryptionService {
    encrypt(text: string): string;
    decrypt(ciphertext: string): string;
    compare(plainText: string, encryptedText: string): boolean;
}
