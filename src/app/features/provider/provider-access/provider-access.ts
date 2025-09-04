import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Patient } from '../../../core/services/patient/patient';

@Component({
  selector: 'app-provider-access',
  standalone: false,
  templateUrl: './provider-access.html',
  styleUrl: './provider-access.scss'
})
export class ProviderAccess {
  accessForm: FormGroup;
  isSubmitting = false;
  authorizedPatients: string[] = []; // TODO: Fetch from PatientRegistry

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private patientService: Patient,
  ) {
    this.accessForm = this.fb.group({
      patientAddress: ['', [Validators.required, Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]]
    });
  }

  ngOnInit(): void {
    // TODO: Fetch list of patients who granted access
  }

  async requestAccess(): Promise<void> {
    if (this.accessForm.invalid) {
      alert('Please enter a valid patient address.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      const { patientAddress } = this.accessForm.value;
      // Note: Actual access granting is done by patient; this could trigger a notification
      alert('Access request sent to patient. Awaiting approval.');
      this.accessForm.reset();
    } catch (error: any) {
      alert(error.message || 'Failed to request access.');
    } finally {
      this.isSubmitting = false;
    }
  }
}