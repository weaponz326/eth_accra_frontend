import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Patient } from '../../../core/services/patient/patient';

@Component({
  selector: 'app-patient-access',
  standalone: false,
  templateUrl: './patient-access.html',
  styleUrl: './patient-access.scss'
})
export class PatientAccess {
  accessForm: FormGroup;
  isSubmitting = false;
  providers: string[] = []; // TODO: Fetch from ProviderRegistry

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private patientService: Patient,
  ) {
    this.accessForm = this.fb.group({
      providerAddress: ['', [Validators.required, Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]]
    });
  }

  ngOnInit(): void {
    // TODO: Fetch list of providers from ProviderRegistry
  }

  async grantAccess(): Promise<void> {
    if (this.accessForm.invalid) {
      alert('Please enter a valid provider address.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      const { providerAddress } = this.accessForm.value;
      await this.patientService.grantAccess(providerAddress, signer).toPromise();
      alert('Access granted successfully!');
      this.accessForm.reset();
    } catch (error: any) {
      alert(error.message || 'Failed to grant access.');
    } finally {
      this.isSubmitting = false;
    }
  }

  async revokeAccess(providerAddress: string): Promise<void> {
    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      await this.patientService.revokeAccess(providerAddress, signer).toPromise();
      alert('Access revoked successfully!');
      this.providers = this.providers.filter(p => p !== providerAddress);
    } catch (error: any) {
      alert(error.message || 'Failed to revoke access.');
    } finally {
      this.isSubmitting = false;
    }
  }
}