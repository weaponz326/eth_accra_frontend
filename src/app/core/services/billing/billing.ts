import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';
import { Invoice } from '../../../shared/models/invoice/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class Billing {
  constructor(private blockchainService: Blockchain) {}

  // createInvoice(patientAddress: string, amount: number, description: string, signer: ethers.Signer): Observable<string> {
  //   return from(this.createInvoiceOnChain(patientAddress, amount, description, signer));
  // }

  // getInvoices(address: string): Observable<Invoice[]> {
  //   return from(this.fetchInvoices(address));
  // }

  // payInvoice(invoiceId: string, amount: number, signer: ethers.Signer): Observable<string> {
  //   return from(this.payInvoiceOnChain(invoiceId, amount, signer));
  // }

  // private async createInvoiceOnChain(patientAddress: string, amount: number, description: string, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('billing', signer);
  //   const tx = await contract.createInvoice(patientAddress, ethers.parseEther(amount.toString()), description);
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }

  // private async fetchInvoices(address: string): Promise<Invoice[]> {
  //   const contract = await this.blockchainService.getContract('billing');
  //   const invoices = await contract.getInvoices(address); // Assume contract method
  //   return invoices.map((inv: any) => ({
  //     id: inv.id,
  //     patientAddress: inv.patientAddress,
  //     providerAddress: inv.providerAddress,
  //     amount: Number(ethers.formatEther(inv.amount)),
  //     description: inv.description,
  //     status: inv.status,
  //     createdAt: new Date(inv.createdAt * 1000).toISOString()
  //   }));
  // }

  // private async payInvoiceOnChain(invoiceId: string, amount: number, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('billing', signer);
  //   const tx = await contract.payInvoice(invoiceId, { value: ethers.parseEther(amount.toString()) });
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }
}