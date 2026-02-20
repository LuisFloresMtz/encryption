import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  // CesarEncryption shifts characters by a specified amount within a custom alphabet.
  CesarEncryption(desplacement: number, text: string, alphabet: string): string {
    let result = '';
    const length = alphabet.length;

    // Normalize shift within alphabet length
    desplacement = ((desplacement % length) + length) % length;

    for (let char of text) {
      const isUpper = char === char.toUpperCase();
      const upperChar = char.toUpperCase();

      // Find position in custom alphabet
      const index = alphabet.indexOf(upperChar);

      if (index !== -1) {
        // Calculate new shifted index
        const newIndex = (index + desplacement) % length;
        const newChar = alphabet[newIndex];

        // Preserve original casing
        result += isUpper ? newChar : newChar.toLowerCase();
      } else {
        // Preserve characters not in alphabet
        result += char;
      }
    }

    return result;
  }

  // CesarDecryption reverses the shift applied by CesarEncryption.
  CesarDecryption(desplacement: number, text: string, alphabet: string): string {
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

  // AtbashEncryption maps each character to its reverse position in the custom alphabet.
  AtbashEncryption(text: string, alphabet: string): string {
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

  // AtbashDecryption is identical to AtbashEncryption since the transformation is symmetrical.
  AtbashDecryption(text: string, alphabet: string): string {
    return this.AtbashEncryption(text, alphabet);
  }
}
