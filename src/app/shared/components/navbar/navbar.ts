import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  userAddress: string | null = null;
  isPatient: boolean = false; // Placeholder: Determine role via contract
  isProvider: boolean = false;

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserAddress().subscribe((address: string | null) => {
      this.userAddress = address;
      // TODO: Check PatientRegistry/ProviderRegistry to set isPatient/isProvider
    });
  }

  connectWallet(): void {
    this.authService.connectWallet();
  }

  disconnectWallet(): void {
    this.authService.disconnect();
    this.router.navigate(['/']);
  }
}