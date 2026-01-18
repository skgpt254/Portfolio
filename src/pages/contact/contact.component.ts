import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

// Custom validator to prevent script injection strings
function noScriptValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  // Check for common XSS characters/patterns like <, >, javascript:, on[event]=
  const scriptPattern = /[<>]/;
  const maliciousPatterns = /javascript:|on\w+=/i;

  if (scriptPattern.test(value) || maliciousPatterns.test(value)) {
    return { hasScript: true };
  }
  return null;
}

// Validator for strictly alphabetic names
function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  // Allows letters, spaces, hyphens, and apostrophes
  const namePattern = /^[a-zA-Z\s\-']+$/;
  if (!namePattern.test(value)) {
    return { invalidName: true };
  }
  return null;
}

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  submissionStatus = signal<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  countries = [
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "India", code: "+91" },
    { name: "Canada", code: "+1" },
    { name: "Australia", code: "+61" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
    { name: "Japan", code: "+81" },
    { name: "China", code: "+86" },
    { name: "Brazil", code: "+55" },
  ];

  contactForm = this.fb.group({
    name: ["", [Validators.required, nameValidator, noScriptValidator]],
    email: ["", [Validators.required, Validators.email, noScriptValidator]],
    countryCode: ["+1", Validators.required],
    contact: ["", [Validators.pattern(/^\d{7,15}$/), Validators.required]], // Digits only, 7-15 length
    message: [
      "",
      [Validators.required, Validators.minLength(10), noScriptValidator],
    ],
    honeypot: [""], // Honeypot field for spam prevention
  });

  onSubmit() {
    if (this.contactForm.get("honeypot")?.value) {
      // This is likely a bot
      console.log("Bot submission detected.");
      return;
    }

    if (this.contactForm.valid) {
      this.submissionStatus.set("submitting");
      console.log("Form Submitted!", this.contactForm.value);

      // Simulate API call
      setTimeout(() => {
        this.submissionStatus.set("success");
        this.contactForm.reset({
          countryCode: "+1",
          name: "",
          email: "",
          contact: "",
          message: "",
          honeypot: "",
        });
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  get name() {
    return this.contactForm.get("name");
  }
  get email() {
    return this.contactForm.get("email");
  }
  get message() {
    return this.contactForm.get("message");
  }
  get contact() {
    return this.contactForm.get("contact");
  }
  get countryCode() {
    return this.contactForm.get("countryCode");
  }
}
