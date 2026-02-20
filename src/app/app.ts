import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncryptionService } from './services/encryption.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faCodeBranch, faBook, faLink } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  facodeBranch = faCodeBranch;
  faLock = faLock;
  faLink = faLink;
  faBook = faBook;

  // Default alphabet
  alphabet = signal<string>('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  // Selected algorithm
  type = signal<'cesar' | 'atbash'>('cesar');

  // Modal visibility
  showModal = signal(false);

  // Shift value for Cesar
  desplacement = signal<number>(0);

  // Input text
  text = signal<string>('');

  // Output text
  outputText = signal<string>('');

  constructor(private encryptionService: EncryptionService) {}

  // Updates selected algorithm
  setType(value: string) {
    this.type.set(value as 'cesar' | 'atbash');
  }
  // Executes encryption
  encrypt() {
    if (this.type() === 'cesar') {
      this.outputText.set(
        this.encryptionService.CesarEncryption(
          this.desplacement(),
          this.text(),
          this.alphabet()
        )
      );
    } else {
      this.outputText.set(
        this.encryptionService.AtbashEncryption(
          this.text(),
          this.alphabet()
        )
      );
    }
  }

  // Executes decryption
  decrypt() {
    if (this.type() === 'cesar') {
      this.outputText.set(
        this.encryptionService.CesarDecryption(
          this.desplacement(),
          this.text(),
          this.alphabet()
        )
      );
    } else {
      this.outputText.set(
        this.encryptionService.AtbashDecryption(
          this.text(),
          this.alphabet()
        )
      );
    }
  }

  // Updates alphabet
  setAlphabet(value: string) {
    this.alphabet.set(value.toUpperCase());
  }

  setText(value: string) {
    this.text.set(value);
  }

  setDesplacement(value: string) {
    this.desplacement.set(Number(value) || 0);
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}