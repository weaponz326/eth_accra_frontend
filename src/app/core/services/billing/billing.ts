import { Injectable } from '@angular/core';
import { ethers, BaseContract, Signer } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';
import { Invoice } from '../../../shared/models/invoice/invoice.model';

// 1. Define the custom interface for the Billing contract
interface BillingContract extends BaseContract {
  createInvoice(patientAddress: string, amount: ethers.BigNumberish, description: string): Promise<ethers.ContractTransactionResponse>;
  getInvoices(address: string): Promise<any[]>;
  payInvoice(invoiceId: string, overrides: { value: ethers.BigNumberish }): Promise<ethers.ContractTransactionResponse>;
  // Add other methods and events as defined in your contract
}

@Injectable({
  providedIn: 'root'
})
export class Billing {
  constructor(private blockchainService: Blockchain) {}

  createInvoice(patientAddress: string, amount: number, description: string, signer: Signer): Observable<string> {
    return from(this.createInvoiceOnChain(patientAddress, amount, description, signer));
  }

  getInvoices(address: string): Observable<Invoice[]> {
    return from(this.fetchInvoices(address));
  }

  payInvoice(invoiceId: string, amount: number, signer: Signer): Observable<string> {
    return from(this.payInvoiceOnChain(invoiceId, amount, signer));
  }

  private async createInvoiceOnChain(patientAddress: string, amount: number, description: string, signer: Signer): Promise<string> {
    const contract = await this.blockchainService.getContract('billing', signer) as BillingContract;
    const tx = await contract.createInvoice(patientAddress, ethers.parseEther(amount.toString()), description);
    const receipt = await tx.wait();
    return receipt!.hash;
  }

  private async fetchInvoices(address: string): Promise<Invoice[]> {
    const contract = await this.blockchainService.getContract('billing') as BillingContract;
    const invoices = await contract.getInvoices(address);
    return invoices.map((inv: any) => ({
      id: inv.id,
      patientAddress: inv.patientAddress,
      providerAddress: inv.providerAddress,
      amount: Number(ethers.formatEther(inv.amount)),
      description: inv.description,
      status: inv.status,
      createdAt: new Date(Number(inv.createdAt) * 1000).toISOString()
    }));
  }

  private async payInvoiceOnChain(invoiceId: string, amount: number, signer: Signer): Promise<string> {
    const contract = await this.blockchainService.getContract('billing', signer) as BillingContract;
    const tx = await contract.payInvoice(invoiceId, { value: ethers.parseEther(amount.toString()) });
    const receipt = await tx.wait();
    return receipt!.hash;
  }
}