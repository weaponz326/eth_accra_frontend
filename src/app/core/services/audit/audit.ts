import { Injectable } from '@angular/core';
import { ethers, BaseContract, Signer } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';

interface AuditLog {
  accessor: string;
  patientAddress: string;
  action: string;
  timestamp: string;
}

// 1. Create a custom interface for the AuditTrail contract
interface AuditTrailContract extends BaseContract {
  getLogs(patientAddress: string): Promise<any[]>;
  // Add other methods from your AuditTrail contract here if needed
}

@Injectable({
  providedIn: 'root'
})
export class Audit {
  constructor(private blockchainService: Blockchain) {}

  getAuditLogs(patientAddress: string): Observable<AuditLog[]> {
    return from(this.fetchAuditLogs(patientAddress));
  }

  private async fetchAuditLogs(patientAddress: string): Promise<AuditLog[]> {
    // 2. Cast the returned contract to the custom interface
    const contract = await this.blockchainService.getContract('auditTrail') as AuditTrailContract;
    
    // The error is now resolved because TypeScript knows about 'getLogs'
    const logs = await contract.getLogs(patientAddress);
    
    return logs.map((log: any) => ({
      accessor: log.accessor,
      patientAddress: log.patientAddress,
      action: log.action,
      timestamp: new Date(Number(log.timestamp) * 1000).toISOString()
    }));
  }
}