import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';
import { Provider } from '../../../core/services/provider/provider';
import { Patient } from '../../../core/services/patient/patient';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  // Existing connectWallet method for MetaMask
  async connectWallet(): Promise<void> {
    try {
      const address = await this.authService.connectWallet();
      await this.checkUser(address);
    } catch (error: any) {
      this.toastr.error(error.message || 'Failed to connect wallet.');
    }
  }

  // New method to handle login with ENS name
  async loginWithEns(ensName: string): Promise<void> {
    try {
      const address = await this.authService.resolveEnsName(ensName);
      if (!address) {
        throw new Error('ENS name not found.');
      }
      // Assuming you want to connect the wallet after resolving the ENS name
      const connectedAddress = await this.authService.connectWallet();
      if (connectedAddress.toLowerCase() !== address.toLowerCase()) {
        throw new Error('Connected wallet address does not match ENS name resolved address.');
      }
      await this.checkUser(address);
    } catch (error: any) {
      this.toastr.error(error.message || 'Failed to log in with ENS name.');
    }
  }

  private async checkUser(address: string): Promise<void> {
    try {
      const patient = await this.patientService.getPatient(address).toPromise();
      if (patient) {
        this.router.navigate(['/patient/dashboard']);
        this.toastr.success(`Logged in as patient: ${patient.name}`);
        return;
      }
    } catch (error: any) {
      this.toastr.error(error.message || 'Not a patient.');
    }
    
    try {
      const provider = await this.providerService.getProvider(address).toPromise();
      if (provider) {
        this.router.navigate(['/provider/dashboard']);
        this.toastr.success(`Logged in as provider: ${provider.name}`);
        return;
      }
    } catch (error: any) {
      this.toastr.error(error.message || 'Not a provider.');
    }
    
    this.router.navigate(['/register']);
  }
}