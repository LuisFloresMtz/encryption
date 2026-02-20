import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  CesarEncryption(desplacement: number, text: string): string {
    let result = '';

    // Normalize shift value to stay within 0–25 range
    // This prevents overflow and handles negative values
    desplacement = ((desplacement % 26) + 26) % 26;

    // Iterate through each character in the input text
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      // Check if character is uppercase (ASCII 65–90)
      if (charCode >= 65 && charCode <= 90) {
        // Apply shift within uppercase range
        result += String.fromCharCode(((charCode - 65 + desplacement) % 26) + 65);
      }
      // Check if character is lowercase (ASCII 97–122)
      else if (charCode >= 97 && charCode <= 122) {
        // Apply shift within lowercase range
        result += String.fromCharCode(((charCode - 97 + desplacement) % 26) + 97);
      } else {
        // Preserve non-alphabetic characters (spaces, symbols, numbers)
        result += text.charAt(i);
      }
    }

    return result;
  }

  CesarDecryption(desplacement: number, text: string): string {
    let result = '';

    // Normalize shift value
    desplacement = ((desplacement % 26) + 26) % 26;

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      // Uppercase letters
      if (charCode >= 65 && charCode <= 90) {
        // Reverse shift by subtracting displacement
        result += String.fromCharCode(((charCode - 65 - desplacement + 26) % 26) + 65);
      }
      // Lowercase letters
      else if (charCode >= 97 && charCode <= 122) {
        result += String.fromCharCode(((charCode - 97 - desplacement + 26) % 26) + 97);
      } else {
        // Preserve non-alphabetic characters
        result += text.charAt(i);
      }
    }

    return result;
  }

  AtbashEncryption(text: string): string {
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      // Uppercase letters
      if (charCode >= 65 && charCode <= 90) {
        // Mirror transformation within uppercase alphabet
        result += String.fromCharCode(90 - (charCode - 65));
      }
      // Lowercase letters
      else if (charCode >= 97 && charCode <= 122) {
        // Mirror transformation within lowercase alphabet
        result += String.fromCharCode(122 - (charCode - 97));
      } else {
        // Preserve non-alphabetic characters
        result += text.charAt(i);
      }
    }

    return result;
  }

  // Decryption for Atbash is identical to encryption
  AtbashDecryption(text: string): string {
    return this.AtbashEncryption(text);
  }
}
