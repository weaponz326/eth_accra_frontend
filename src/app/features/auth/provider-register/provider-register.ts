import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';
import { Provider } from '../../../core/services/provider/provider';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-provider-register',
  standalone: false,
  templateUrl: './provider-register.html',
  styleUrl: './provider-register.scss',
})
export class ProviderRegister {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private providerService: Provider,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      specialty: ['', [Validators.required, Validators.minLength(3)]],
      ensName: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) {
        throw new Error('No wallet connected. Please connect your wallet.');
      }

      const { name, specialty, ensName } = this.registerForm.value;
      const fullEnsName = `${ensName}.clinic-data.eth`;
      const userAddress = await signer.getAddress();

      // Resolve the ENS name to an address to check if it's already in use
      const resolvedAddress = await this.authService.resolveEnsName(
        fullEnsName
      );
      if (resolvedAddress && resolvedAddress !== userAddress) {
        throw new Error(
          `ENS name "${fullEnsName}" is already taken by another user.`
        );
      }

      // First, register the provider on-chain
      await this.providerService
        .registerProvider(name, specialty, signer)
        .toPromise();

      // Next, register the ENS name
      await this.authService.registerEns(fullEnsName, userAddress);

      this.toastr.success('Provider registered successfully!');
      this.router.navigate(['/provider/dashboard']);
    } catch (error: any) {
      this.toastr.error(error.message || 'An error occurred during registration.');
    } finally {
      this.isSubmitting = false;
    }
  }
}