import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncryptionService } from './services/encryption.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
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
