import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';
import { Patient } from '../../../core/services/patient/patient';

@Component({
  selector: 'app-patient-register',
  standalone: false,
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.scss'
})
export class PatientRegister {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private patientService: Patient,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      bio: ['', [Validators.required, Validators.minLength(10)]]
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
      const { name, bio } = this.registerForm.value;
      await this.patientService.registerPatient(name, bio, signer).toPromise();
      alert('Patient registered successfully!');
      this.router.navigate(['/patient/dashboard']);
    } catch (error: any) {
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}