import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Provider } from '../../../core/services/provider/provider';

@Component({
  selector: 'app-referrals',
  standalone: false,
  templateUrl: './referrals.html',
  styleUrl: './referrals.scss'
})
export class Referrals {
  referralForm: FormGroup;
  referrals: any[] = []; // TODO: Define Referral model
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private providerService: Provider,
  ) {
    this.referralForm = this.fb.group({
      patientAddress: ['', [Validators.required, Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]],
      toProvider: ['', [Validators.required, Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]]
    });
  }

  ngOnInit(): void {
    // TODO: Fetch referrals from ReferralSystem contract
  }

  async onSubmit(): Promise<void> {
    if (this.referralForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      const { patientAddress, toProvider } = this.referralForm.value;
      await this.providerService.createReferral(patientAddress, toProvider, signer).toPromise();
      alert('Referral created successfully!');
      this.referralForm.reset();
      // TODO: Reload referrals
    } catch (error: any) {
      alert(error.message || 'Failed to create referral.');
    } finally {
      this.isSubmitting = false;
    }
  }
}