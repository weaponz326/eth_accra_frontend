import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../../../shared/models/invoice/invoice.model';
import { Auth } from '../../../core/services/auth/auth';
import { Billing } from '../../../core/services/billing/billing';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        this.toastr.error('Please connect your wallet.');
        return;
      }
      this.billingService.getInvoices(address).subscribe({
        next: (invoices) => this.invoices = invoices,
        error: (err) => this.toastr.error('Failed to load invoices: ' + err.message)
      });
    });
  }

  async onSubmit(): Promise<void> {
    if (this.invoiceForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      const { patientAddress, amount, description } = this.invoiceForm.value;
      await this.billingService.createInvoice(patientAddress, amount, description, signer).toPromise();
      this.toastr.success('Invoice created successfully!');
      this.invoiceForm.reset();
      this.loadInvoices();
    } catch (error: any) {
      this.toastr.error(error.message || 'Failed to create invoice.');
    } finally {
      this.isSubmitting = false;
    }
  }
}