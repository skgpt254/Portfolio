import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  
  submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    honeypot: [''] // Honeypot field for spam prevention
  });

  onSubmit() {
    if (this.contactForm.get('honeypot')?.value) {
      // This is likely a bot
      console.log('Bot submission detected.');
      return;
    }

    if (this.contactForm.valid) {
      this.submissionStatus.set('submitting');
      console.log('Form Submitted!', this.contactForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.submissionStatus.set('success');
        this.contactForm.reset();
      }, 1500);
    }
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
}
