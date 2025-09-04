import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../../../shared/models/invoice/invoice.model';
import { Auth } from '../../../core/services/auth/auth';
import { Billing } from '../../../core/services/billing/billing';

@Component({
  selector: 'app-provider-billing',
  standalone: false,
  templateUrl: './provider-billing.html',
  styleUrl: './provider-billing.scss'
})
export class ProviderBilling {
  invoiceForm: FormGroup;
  invoices: Invoice[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private billingService: Billing,
  ) {
    this.invoiceForm = this.fb.group({
      patientAddress: ['', [Validators.required, Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.loadInvoices();
  }

  private loadInvoices(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (!address) {
        alert('Please connect your wallet.');
        return;
      }
      this.billingService.getInvoices(address).subscribe({
        next: (invoices) => this.invoices = invoices,
        error: (err) => alert('Failed to load invoices: ' + err.message)
      });
    });
  }

  async onSubmit(): Promise<void> {
    if (this.invoiceForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      const { patientAddress, amount, description } = this.invoiceForm.value;
      await this.billingService.createInvoice(patientAddress, amount, description, signer).toPromise();
      alert('Invoice created successfully!');
      this.invoiceForm.reset();
      this.loadInvoices();
    } catch (error: any) {
      alert(error.message || 'Failed to create invoice.');
    } finally {
      this.isSubmitting = false;
    }
  }
}