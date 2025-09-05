import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Provider } from '../../../core/services/provider/provider';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      const { patientAddress, toProvider } = this.referralForm.value;
      await this.providerService.createReferral(patientAddress, toProvider, signer).toPromise();
      this.toastr.success('Referral created successfully!');
      this.referralForm.reset();
      // TODO: Reload referrals
    } catch (error: any) {
      this.toastr.error(error.message || 'Failed to create referral.');
    } finally {
      this.isSubmitting = false;
    }
  }
}