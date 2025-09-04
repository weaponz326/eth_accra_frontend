import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';

interface AuditLog {
  accessor: string;
  patientAddress: string;
  action: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class Audit {
  constructor(private blockchainService: Blockchain) {}

  // getAuditLogs(patientAddress: string): Observable<AuditLog[]> {
  //   return from(this.fetchAuditLogs(patientAddress));
  // }

  // private async fetchAuditLogs(patientAddress: string): Promise<AuditLog[]> {
  //   const contract = await this.blockchainService.getContract('auditTrail');
  //   const logs = await contract.getLogs(patientAddress); // Assume contract method
  //   return logs.map((log: any) => ({
  //     accessor: log.accessor,
  //     patientAddress: log.patientAddress,
  //     action: log.action,
  //     timestamp: new Date(log.timestamp * 1000).toISOString()
  //   }));
  // }
}