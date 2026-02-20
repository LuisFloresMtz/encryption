# Encryption App

A modern Angular application that provides text encryption and decryption using the Cesar Cipher and Atbash Cipher algorithms with support for a **custom alphabet**. The application features a dark-mode interface, is built using Angular Signals for reactive state management, and styled with TailwindCSS. The project is deployed using GitHub Pages.

---

## Overview

This project demonstrates the implementation of two classical substitution ciphers enhanced with dynamic alphabet support:

- Cesar
- Atbash

---

## Custom Alphabet Support

Unlike traditional implementations that rely on ASCII ranges, this application uses an index-based approach with a user-defined alphabet.

Examples of valid alphabets:


ABCDEFGHIJKLMNOPQRSTUVWXYZ
ABCDEFGHIJKLMNÑOPQRSTUVWXYZ
QWERTYUIOPASDFGHJKLZXCVBNM
ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789


All transformations are performed using index lookups within the provided alphabet.

---

## Algorithms

### Cesar Cipher (Dynamic Version)

The Cesar Cipher shifts characters based on their position within the custom alphabet.

Process:

1. Find the index of each character inside the custom alphabet.
2. Normalize the shift value.
3. Apply modular arithmetic.
4. Preserve original casing.
5. Leave characters not in the alphabet unchanged.

Shift normalization:

desplacement = ((desplacement % alphabetLength) + alphabetLength) % alphabetLength

Encryption:

newIndex = (index + shift) % alphabetLength

Decryption:

newIndex = (index - shift + alphabetLength) % alphabetLength


---

### Atbash Cipher (Dynamic Version)

The Atbash Cipher mirrors characters within the custom alphabet.

For each character:


newIndex = alphabetLength - 1 - index


Because the transformation is symmetrical, encryption and decryption are identical operations.

---