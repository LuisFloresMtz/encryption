import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  CesarEncryption(desplacement: number, text: string, alphabet: string): string {
    if (alphabet === 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      return this.cesarAsciiEncrypt(desplacement, text);
    }

    return this.cesarCustomEncrypt(desplacement, text, alphabet);
  }

  CesarDecryption(text: string, alphabet: string): string {
    let bestResult = '';
    let bestScore = -1;

    const commonWords = [
      'THE',
      'AND',
      'LA',
      'EL',
      'DE',
      'HOLA',
      'Y',
      'EN',
      'A',
      'TO',
      'OF',
      'QUE',
      'IS',
      'IN',
      'IT',
      'YOU',
      'FOR',
      'ON',
    ];
    const maxShift = alphabet.length;

    for (let desplacement = 0; desplacement < maxShift; desplacement++) {
      const decrypted =
        alphabet === 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          ? this.cesarAsciiDecrypt(desplacement, text)
          : this.cesarCustomDecrypt(desplacement, text, alphabet);

      let score = 0;
      const upperText = decrypted.toUpperCase();

      for (const word of commonWords) {
        if (upperText.includes(word)) {
          score++;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestResult = decrypted;
      }

      if (desplacement === 0) {
        bestResult = decrypted;
      }
    }

    return bestResult;
  }

  AtbashEncryption(text: string, alphabet: string): string {
    if (alphabet === 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      return this.atbashAscii(text);
    }

    return this.atbashCustom(text, alphabet);
  }

  AtbashDecryption(text: string, alphabet: string): string {
    return this.AtbashEncryption(text, alphabet);
  }

  private cesarAsciiEncrypt(desplacement: number, text: string): string {
    let result = '';
    desplacement = ((desplacement % 26) + 26) % 26;

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        result += String.fromCharCode(((code - 65 + desplacement) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        result += String.fromCharCode(((code - 97 + desplacement) % 26) + 97);
      } else {
        result += text[i];
      }
    }

    return result;
  }

  private cesarAsciiDecrypt(desplacement: number, text: string): string {
    let result = '';
    desplacement = ((desplacement % 26) + 26) % 26;

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        result += String.fromCharCode(((code - 65 - desplacement + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        result += String.fromCharCode(((code - 97 - desplacement + 26) % 26) + 97);
      } else {
        result += text[i];
      }
    }

    return result;
  }

  private atbashAscii(text: string): string {
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        result += String.fromCharCode(90 - (code - 65));
      } else if (code >= 97 && code <= 122) {
        result += String.fromCharCode(122 - (code - 97));
      } else {
        result += text[i];
      }
    }

    return result;
  }

  private cesarCustomEncrypt(desplacement: number, text: string, alphabet: string): string {
    let result = '';
    const length = alphabet.length;
    desplacement = ((desplacement % length) + length) % length;

    for (let char of text) {
      const isUpper = char === char.toUpperCase();
      const upperChar = char.toUpperCase();
      const index = alphabet.indexOf(upperChar);

      if (index !== -1) {
        const newIndex = (index + desplacement) % length;
        const newChar = alphabet[newIndex];
        result += isUpper ? newChar : newChar.toLowerCase();
      } else {
        result += char;
      }
    }

    return result;
  }

  private cesarCustomDecrypt(desplacement: number, text: string, alphabet: string): string {
    let result = '';
    const length = alphabet.length;
    desplacement = ((desplacement % length) + length) % length;

    for (let char of text) {
      const isUpper = char === char.toUpperCase();
      const upperChar = char.toUpperCase();
      const index = alphabet.indexOf(upperChar);

      if (index !== -1) {
        const newIndex = (index - desplacement + length) % length;
        const newChar = alphabet[newIndex];
        result += isUpper ? newChar : newChar.toLowerCase();
      } else {
        result += char;
      }
    }

    return result;
  }

  private atbashCustom(text: string, alphabet: string): string {
    let result = '';
    const length = alphabet.length;

    for (let char of text) {
      const isUpper = char === char.toUpperCase();
      const upperChar = char.toUpperCase();
      const index = alphabet.indexOf(upperChar);

      if (index !== -1) {
        const newChar = alphabet[length - 1 - index];
        result += isUpper ? newChar : newChar.toLowerCase();
      } else {
        result += char;
      }
    }

    return result;
  }
}
