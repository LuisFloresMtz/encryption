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

## Project Architecture

The application follows a layered structure:

**Presentation Layer**

- Angular Standalone Component
- HTML Template
- TailwindCSS Styling

**Business Logic Layer**

- EncryptionService

**State Management**

- Angular Signals

---

# Code Documentation

## App Component (`app.component.ts`)

The App component manages state and user interaction.

```ts
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncryptionService } from './services/encryption.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = signal('Cesar and Atbash Encryption');
  type = signal<'cesar' | 'atbash'>('cesar');
  desplacement = signal<number>(0);
  text = signal<string>('');
  outputText = signal<string>('');

  constructor(private encryptionService: EncryptionService) {}

  encrypt() {
    if (this.type() === 'cesar') {
      this.outputText.set(this.encryptionService.CesarEncryption(this.desplacement(), this.text()));
    } else {
      this.outputText.set(this.encryptionService.AtbashEncryption(this.text()));
    }
  }

  decrypt() {
    if (this.type() === 'cesar') {
      this.outputText.set(this.encryptionService.CesarDecryption(this.desplacement(), this.text()));
    } else {
      this.outputText.set(this.encryptionService.AtbashDecryption(this.text()));
    }
  }

  setType(value: string) {
    this.type.set(value as 'cesar' | 'atbash');
  }

  setText(value: string) {
    this.text.set(value);
  }

  setDesplacement(value: string) {
    this.desplacement.set(Number(value) || 0);
  }
}
```
