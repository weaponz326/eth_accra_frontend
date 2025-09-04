import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Encryption {
  encrypt(data: any, key: string): any {
    // return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  decrypt(encryptedData: string, key: string): any {
    try {
      // const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      // return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }
}