# Encryption App

A modern Angular application that provides text encryption and decryption using the Cesar Cipher and Atbash Cipher algorithms. The application features a clean dark-mode interface, built with Angular Signals and styled using TailwindCSS. It is deployed via GitHub Pages.

---

## Overview

This project demonstrates the implementation of two classical substitution ciphers:

- Cesar Cipher (shift cipher)
- Atbash Cipher

The application allows users to input text, select the desired algorithm, define a shift value (for Cesar), and generate encrypted or decrypted output instantly.

---

## Algorithms

### Cesar Cipher

The Cesar Cipher shifts each alphabetic character by a fixed number of positions in the alphabet, defined as the "deplacement" (shift value).

Example with a shift of 3:

| Original | Encrypted |
| -------- | --------- |
| A        | D         |
| B        | E         |
| C        | F         |

Key characteristics:

- Supports both uppercase and lowercase letters.
- Preserves letter casing.
- Non-alphabetic characters remain unchanged.
- Decryption reverses the shift using modular arithmetic.

Encryption formula:

Encrypted = (charCode - base + shift) % 26 + base

---

### Atbash Cipher

The Atbash Cipher is a substitution cipher that replaces each letter with its opposite in the alphabet.

Example:

| Original | Encrypted |
| -------- | --------- |
| A        | Z         |
| B        | Y         |
| C        | X         |

Key characteristics:

- Symmetric cipher (encryption and decryption are identical).
- Preserves uppercase and lowercase letters.
- Non-alphabetic characters remain unchanged.

---

## Technology Stack

- Angular (Standalone Components and Signals)
- TypeScript
- TailwindCSS
- GitHub Pages (Deployment)

---

## Installation and Development

Clone the repository:

```bash
git clone https://github.com/LuisFloresMtz/encryption.git
cd encryption
```
