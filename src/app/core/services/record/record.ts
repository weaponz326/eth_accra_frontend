import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Blockchain } from '../blockchain/blockchain';
import { Ipfs } from '../ipfs/ipfs';
import { Encryption } from '../encryption/encryption';
// import { Record } from '../../shared/models/record.model';

@Injectable({
  providedIn: 'root'
})
export class Record {
  constructor(
    private blockchainService: Blockchain,
    private ipfsService: Ipfs,
    private encryptionService: Encryption
  ) {}

  // addRecord(record: any, patientAddress: string, providerAddress: string, encryptionKey: string, signer: ethers.Signer): Observable<string> {
  //   return from(this.ipfsService.upload(this.encryptionService.encrypt(record, encryptionKey))).pipe(
  //     switchMap(ipfsHash => this.addRecordOnChain(ipfsHash, patientAddress, providerAddress, signer))
  //   );
  // }

  // getRecords(patientAddress: string, encryptionKey: string): Observable<Record[]> {
  //   return from(this.fetchRecords(patientAddress, encryptionKey));
  // }

  // private async addRecordOnChain(ipfsHash: string, patientAddress: string, providerAddress: string, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('records', signer);
  //   const tx = await contract.addRecord(patientAddress, ipfsHash, providerAddress);
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }

  // private async fetchRecords(patientAddress: string, encryptionKey: string): Promise<Record[]> {
  //   const contract = await this.blockchainService.getContract('records');
  //   const records = await contract.getRecords(patientAddress); // Assume contract method
  //   const results: Record[] = [];
  //   for (const rec of records) {
  //     const data = await this.ipfsService.download(rec.ipfsHash);
  //     const decrypted = this.encryptionService.decrypt(data, encryptionKey);
  //     results.push({
  //       id: rec.id,
  //       patientAddress: rec.patientAddress,
  //       providerAddress: rec.providerAddress,
  //       title: decrypted.title,
  //       data: decrypted,
  //       ipfsHash: rec.ipfsHash,
  //       createdAt: new Date(rec.createdAt * 1000).toISOString()
  //     });
  //   }
  //   return results;
  // }
}