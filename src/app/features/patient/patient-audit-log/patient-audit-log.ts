import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { Audit } from '../../../core/services/audit/audit';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  private loadAuditLogs(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (!address) {
        this.toastr.error('Please connect your wallet.');
        return;
      }
      this.auditService.getAuditLogs(address).subscribe({
        next: (logs) => this.auditLogs = logs,
        error: (err) => this.toastr.error('Failed to load audit logs: ' + err.message)
      });
    });
  }
}