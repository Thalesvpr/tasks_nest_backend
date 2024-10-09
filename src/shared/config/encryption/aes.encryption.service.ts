import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { IEncryptionService } from './encryption.service.i';
import { AppConfig } from '../app.config';

@Injectable()
export class AESEncryptionService implements IEncryptionService {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY
  }
  
  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }
  
  decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  
  compare(plainText: string, encryptedText: string): boolean {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText === plainText;

  }
}
