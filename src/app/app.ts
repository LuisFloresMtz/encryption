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

  type = signal<'cesar' | 'atbash'>('cesar');
  showModal = signal(false);
  desplacement = signal<number>(0);
  text = signal<string>('');
  outputText = signal<string>('');

  constructor(private encryptionService: EncryptionService) {}

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
      this.outputText.set(this.encryptionService.CesarEncryption(this.desplacement(), this.text()));
    } else {
      // Calls Atbash encryption (no shift required)
      this.outputText.set(this.encryptionService.AtbashEncryption(this.text()));
    }
  }

  // Executes decryption based on selected algorithm
  decrypt() {
    // Check which algorithm is selected
    if (this.type() === 'cesar') {
      // Calls Cesar decryption (reverse shift)
      this.outputText.set(this.encryptionService.CesarDecryption(this.desplacement(), this.text()));
    } else {
      // Atbash decryption is identical to encryption
      this.outputText.set(this.encryptionService.AtbashDecryption(this.text()));
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

  // Opens the documentation modal
  openModal() {
    this.showModal.set(true);
  }

  // Closes the documentation modal
  closeModal() {
    this.showModal.set(false);
  }
}
