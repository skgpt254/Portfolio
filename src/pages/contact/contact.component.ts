import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

function noScriptValidator(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  if (!v) return null;
  return /[<>]/.test(v) || /javascript:|on\w+=/i.test(v) ? { hasScript: true } : null;
}

function nameValidator(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  if (!v) return null;
  return /^[a-zA-Z\s\-']+$/.test(v) ? null : { invalidName: true };
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private dataService = inject(PortfolioDataService);

  contactInfo = this.dataService.contactInfo;
  socialLinks = this.dataService.socialLinks;
  submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');

  countries = [
    { name: 'India', code: '+91' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Australia', code: '+61' },
    { name: 'Germany', code: '+49' },
    { name: 'Singapore', code: '+65' },
    { name: 'UAE', code: '+971' },
  ];

  contactForm = this.fb.group({
    name:        ['', [Validators.required, nameValidator, noScriptValidator]],
    email:       ['', [Validators.required, Validators.email, noScriptValidator]],
    countryCode: ['+91', Validators.required],
    contact:     ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
    subject:     ['', [Validators.required, Validators.minLength(3), noScriptValidator]],
    message:     ['', [Validators.required, Validators.minLength(10), noScriptValidator]],
    honeypot:    [''],
  });

  onSubmit() {
    if (this.contactForm.get('honeypot')?.value) return;
    if (this.contactForm.invalid) { this.contactForm.markAllAsTouched(); return; }
    this.submissionStatus.set('submitting');
    const { honeypot, countryCode, contact, ...rest } = this.contactForm.value;
    this.http.post('https://formspree.io/f/YOUR_FORM_ID', { ...rest, phone: `${countryCode} ${contact}` }).subscribe({
      next: () => { this.submissionStatus.set('success'); this.contactForm.reset({ countryCode: '+91' }); },
      error: () => this.submissionStatus.set('error'),
    });
  }

  get name()    { return this.contactForm.get('name'); }
  get email()   { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
  get contact() { return this.contactForm.get('contact'); }
}
