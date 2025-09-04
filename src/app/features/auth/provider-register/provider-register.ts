import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';
import { Provider } from '../../../core/services/provider/provider';

@Component({
  selector: 'app-provider-register',
  standalone: false,
  templateUrl: './provider-register.html',
  styleUrl: './provider-register.scss'
})
export class ProviderRegister {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private providerService: Provider,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      specialty: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) {
        throw new Error('No wallet connected. Please connect your wallet.');
      }
      const { name, specialty } = this.registerForm.value;
      await this.providerService.registerProvider(name, specialty, signer).toPromise();
      alert('Provider registered successfully!');
      this.router.navigate(['/provider/dashboard']);
    } catch (error: any) {
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}