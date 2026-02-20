# Encryption App

A modern Angular application that provides text encryption and decryption using the Cesar Cipher and Atbash Cipher algorithms. The application features a dark-mode interface, built with Angular Signals and styled using TailwindCSS. The project is deployed using GitHub Pages.

---

## Overview

This project demonstrates the implementation of two classical substitution ciphers:

- Cesar Cipher (shift cipher)
- Atbash Cipher

The application allows users to:

- Enter text
- Select an encryption algorithm
- Define a shift value (for Cesar)
- Encrypt or decrypt instantly
- View results dynamically

The architecture separates presentation logic from business logic using Angular services.

---

## Algorithms

### Cesar Cipher

The Cesar Cipher shifts each alphabetic character by a fixed number of positions in the alphabet.

Example with shift = 3:

| Original | Encrypted |
| -------- | --------- |
| A        | D         |
| B        | E         |
| C        | F         |

Characteristics:

- Supports uppercase and lowercase letters
- Preserves casing
- Non-alphabetic characters remain unchanged
- Uses modular arithmetic to wrap around the alphabet

Encryption formula:

Encrypted = (charCode - base + shift) % 26 + base

---

### Atbash Cipher

The Atbash Cipher replaces each letter with its opposite in the alphabet.

Example:

| Original | Encrypted |
| -------- | --------- |
| A        | Z         |
| B        | Y         |
| C        | X         |

Characteristics:

- Symmetric cipher
- Encryption and decryption are identical
- Preserves casing
- Non-alphabetic characters remain unchanged

---

# Code Documentation

## App Component (`app.component.ts`)

The App component manages state and user interaction. It connects the UI with the `EncryptionService` and uses Angular Signals for reactive state management.

```ts
// Updates the selected encryption type (Cesar or Atbash)
setType(value: string) {
  // Casts the value to the allowed union type
  this.type.set(value as 'cesar' | 'atbash');
}

// Executes encryption based on selected algorithm
encrypt() {
  // Check which algorithm is selected
  if (this.type() === 'cesar') {

    // Calls Cesar encryption with shift value and input text
    this.outputText.set(
      this.encryptionService.CesarEncryption(
        this.desplacement(),
        this.text()
      )
    );

  } else {

    // Calls Atbash encryption (no shift required)
    this.outputText.set(
      this.encryptionService.AtbashEncryption(
        this.text()
      )
    );
  }
}

// Executes decryption based on selected algorithm
decrypt() {
  // Check which algorithm is selected
  if (this.type() === 'cesar') {

    // Calls Cesar decryption (reverse shift)
    this.outputText.set(
      this.encryptionService.CesarDecryption(
        this.desplacement(),
        this.text()
      )
    );

  } else {

    // Atbash decryption is identical to encryption
    this.outputText.set(
      this.encryptionService.AtbashDecryption(
        this.text()
      )
    );
  }
}

// Updates the input text signal
setText(value: string) {
  this.text.set(value);
}

// Updates and normalizes the shift value
setDesplacement(value: string) {
  // Converts string input to number
  // Defaults to 0 if invalid
  this.desplacement.set(Number(value) || 0);
}
```

## Encryption Service(`encryption.service.ts`)

The EncryptionService contains the core encryption logic.
It is provided at the root level, making it available throughout the application.

```ts
// Encrypts text using the Cesar Cipher
  CesarEncryption(desplacement: number, text: string): string {
    let result = '';

    // Normalize shift to avoid overflow or negative values
    desplacement = ((desplacement % 26) + 26) % 26;

    // Iterate over each character in the input text
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      // Uppercase letters (A-Z ASCII range)
      if (charCode >= 65 && charCode <= 90) {

        // Apply shift within uppercase range
        result += String.fromCharCode(
          ((charCode - 65 + desplacement) % 26) + 65
        );

      }
      // Lowercase letters (a-z ASCII range)
      else if (charCode >= 97 && charCode <= 122) {

        // Apply shift within lowercase range
        result += String.fromCharCode(
          ((charCode - 97 + desplacement) % 26) + 97
        );

      }
      else {
        // Keep non-alphabetic characters unchanged
        result += text.charAt(i);
      }
    }

    return result;
  }

  // Decrypts text using the Cesar Cipher
  CesarDecryption(desplacement: number, text: string): string {
    let result = '';

    // Normalize shift value
    desplacement = ((desplacement % 26) + 26) % 26;

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      // Uppercase letters
      if (charCode >= 65 && charCode <= 90) {

        // Reverse shift (subtract instead of add)
        result += String.fromCharCode(
          ((charCode - 65 - desplacement + 26) % 26) + 65
        );

      }
      // Lowercase letters
      else if (charCode >= 97 && charCode <= 122) {

        result += String.fromCharCode(
          ((charCode - 97 - desplacement + 26) % 26) + 97
        );

      }
      else {
        // Preserve non-alphabetic characters
        result += text.charAt(i);
      }
    }

    return result;
  }

  // Encrypts text using Atbash Cipher
  AtbashEncryption(text: string): string {
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      // Uppercase letters
      if (charCode >= 65 && charCode <= 90) {

        // Replace with opposite letter in alphabet
        result += String.fromCharCode(
          90 - (charCode - 65)
        );

      }
      // Lowercase letters
      else if (charCode >= 97 && charCode <= 122) {

        result += String.fromCharCode(
          122 - (charCode - 97)
        );

      }
      else {
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
```
