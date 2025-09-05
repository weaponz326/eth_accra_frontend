import { Component } from '@angular/core';
import { Invoice } from '../../../shared/models/invoice/invoice.model';
import { Auth } from '../../../core/services/auth/auth';
import { Billing as BillingService } from '../../../core/services/billing/billing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-billing',
  standalone: false,
  templateUrl: './patient-billing.html',
  styleUrl: './patient-billing.scss'
})
export class PatientBilling {
  invoices: Invoice[] = [];
  isSubmitting = false;

  constructor(
    private authService: Auth,
    private billingService: BillingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  private loadInvoices(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (!address) {
        this.toastr.error('Please connect your wallet.');
        return;
      }
      this.billingService.getInvoices(address).subscribe({
        next: (invoices) => this.invoices = invoices,
        error: (err) => this.toastr.error('Failed to load invoices: ' + err.message)
      });
    });
  }

  async payInvoice(invoice: Invoice): Promise<void> {
    if (invoice.status !== 'Pending') {
      this.toastr.error('This invoice cannot be paid.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      await this.billingService.payInvoice(invoice.id, invoice.amount, signer).toPromise();
      this.toastr.success('Invoice paid successfully!');
      this.loadInvoices();
    } catch (error: any) {
      this.toastr.error(error.message || 'Failed to pay invoice.');
    } finally {
      this.isSubmitting = false;
    }
  }
}