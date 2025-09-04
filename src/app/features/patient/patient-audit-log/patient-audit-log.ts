import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { Audit } from '../../../core/services/audit/audit';

@Component({
  selector: 'app-patient-audit-log',
  standalone: false,
  templateUrl: './patient-audit-log.html',
  styleUrl: './patient-audit-log.scss'
})
export class PatientAuditLog {
  auditLogs: any[] = [];

  constructor(
    private authService: Auth,
    private auditService: Audit,
  ) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  private loadAuditLogs(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (!address) {
        alert('Please connect your wallet.');
        return;
      }
      this.auditService.getAuditLogs(address).subscribe({
        next: (logs) => this.auditLogs = logs,
        error: (err) => alert('Failed to load audit logs: ' + err.message)
      });
    });
  }
}