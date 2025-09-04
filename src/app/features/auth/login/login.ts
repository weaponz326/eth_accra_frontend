import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';
import { Provider } from '../../../core/services/provider/provider';
import { Patient } from '../../../core/services/patient/patient';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(
    private authService: Auth,
    private patientService: Patient,
    private providerService: Provider,
    private router: Router,
  ) {}

  async connectWallet(): Promise<void> {
    try {
      const address = await this.authService.connectWallet();
      // Check if user is a registered patient
      try {
        const patient = await this.patientService.getPatient(address).toPromise();
        if (patient) {
          this.router.navigate(['/patient/dashboard']);
          return;
        }
      } catch (error) {
        // Not a patient
      }
      // Check if user is a registered provider
      try {
        const provider = await this.providerService.getProvider(address).toPromise();
        if (provider) {
          this.router.navigate(['/provider/dashboard']);
          return;
        }
      } catch (error) {
        // Not a provider
      }
      // New user, redirect to choose registration type
      this.router.navigate(['/auth/patient-register']);
    } catch (error) {
      alert('Failed to connect wallet. Please try again.');
    }
  }
}