import { Component } from '@angular/core';
import { Invoice } from '../../../shared/models/invoice/invoice.model';
import { Provider } from '../../../shared/models/provider/provider.model';
import { Auth } from '../../../core/services/auth/auth';
import { Provider as ProviderService } from '../../../core/services/provider/provider';
import { Billing as billingService } from '../../../core/services/billing/billing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-provider-dashboard',
  standalone: false,
  templateUrl: './provider-dashboard.html',
  styleUrl: './provider-dashboard.scss'
})
export class ProviderDashboard {
  invoices: Invoice[] = [];
  referrals: any[] = []; // TODO: Define Referral model
  patients: string[] = []; // TODO: Fetch from PatientRegistry
  provider: Provider | null = null;

  constructor(
    private authService: Auth,
    private providerService: ProviderService,
    private billingService: billingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (!address) {
        this.toastr.error('Please connect your wallet.');
        return;
      }
      // Load provider profile
      this.providerService.getProvider(address).subscribe({
        next: (provider) => this.provider = provider,
        error: (err) => this.toastr.error('Failed to load provider profile: ' + err.message)
      });
      // Load invoices
      this.billingService.getInvoices(address).subscribe({
        next: (invoices) => this.invoices = invoices,
        error: (err) => this.toastr.error('Failed to load invoices: ' + err.message)
      });
      // TODO: Load referrals and authorized patients from contracts
    });
  }
}