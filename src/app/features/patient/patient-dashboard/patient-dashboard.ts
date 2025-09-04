import { Component } from '@angular/core';
import { Records as RecordService } from '../../../core/services/record/record';
import { Billing as BillingService } from '../../../core/services/billing/billing';
import { Audit as AuditService } from '../../../core/services/audit/audit';
import { Record } from '../../../shared/models/record/record.model';
import { Invoice } from '../../../shared/models/invoice/invoice.model';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-patient-dashboard',
  standalone: false,
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.scss'
})
export class PatientDashboard {
  records: Record[] = [];
  invoices: Invoice[] = [];
  auditLogs: any[] = [];
  encryptionKey: string = ''; // TODO: Securely obtain from user or wallet

  constructor(
    private authService: Auth,
    private recordService: RecordService,
    private billingService: BillingService,
    private auditService: AuditService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (!address) {
        alert('Please connect your wallet.');
        return;
      }
      // Load records
      this.recordService.getRecords(address, this.encryptionKey).subscribe({
        next: (records) => this.records = records,
        error: (err) => alert('Failed to load records: ' + err.message)
      });
      // Load invoices
      this.billingService.getInvoices(address).subscribe({
        next: (invoices) => this.invoices = invoices,
        error: (err) => alert('Failed to load invoices: ' + err.message)
      });
      // Load audit logs
      this.auditService.getAuditLogs(address).subscribe({
        next: (logs) => this.auditLogs = logs,
        error: (err) => alert('Failed to load audit logs: ' + err.message)
      });
    });
  }
}