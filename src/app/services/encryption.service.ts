import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  CesarEncryption(desplacement: number, text: string): string {
    let result = '';
    desplacement = ((desplacement % 26) + 26) % 26;

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(((charCode - 65 + desplacement) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        result += String.fromCharCode(((charCode - 97 + desplacement) % 26) + 97);
      } else {
        result += text.charAt(i);
      }
    }

    return result;
  }

  CesarDecryption(desplacement: number, text: string): string {
    let result = '';
    desplacement = ((desplacement % 26) + 26) % 26;

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(((charCode - 65 - desplacement + 26) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        result += String.fromCharCode(((charCode - 97 - desplacement + 26) % 26) + 97);
      } else {
        result += text.charAt(i);
      }
    }

    return result;
  }

  AtbashEncryption(text: string): string {
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(90 - (charCode - 65));
      } else if (charCode >= 97 && charCode <= 122) {
        result += String.fromCharCode(122 - (charCode - 97));
      } else {
        result += text.charAt(i);
      }
    }

    return result;
  }

  AtbashDecryption(text: string): string {
    return this.AtbashEncryption(text);
  }
}
